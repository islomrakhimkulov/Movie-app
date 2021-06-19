const row  = document.querySelector('.list');
const movieRow  = document.querySelector('.movie');
const API_KEY = 'ad44a4a050c8c1298c2c8b9160e5228f';
const API_ROOT = 'https://api.themoviedb.org/3';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w200';

const spinner = '<div class="spinner"></div>';

const  url = function(path=''){
  return API_ROOT+path +'?api_key='+API_KEY;
};


const pathname = window.location.pathname;

if(pathname.indexOf('index.html') > -1){
   sendRequest(url('/movie/popular'),displayList);
}else
if(pathname.indexOf('open.html') > -1){
  const searchParams = new URLSearchParams(window.location.search);
  const id = parseInt(searchParams.get('id'));
  console.log(id)
  sendRequest(url('/movie/'+ id) , displaySingle)
}

function sendRequest(url='',cb){
  
  cb(true);
  fetch(url)
  .then(function(res){
    return res.json()
  })
  .then(function(data){
    cb(false,data);
  })
  
}



function displayList(isLoading=true,data=[]){
  
    row.innerHTML = '';
  
    if(isLoading){
      row.insertAdjacentHTML('beforeend',spinner);
    }
    else if(data.results.length){
      console.log(data)
      data.results.forEach(function(item){
        var movie = '<div class="col-md-3">'+
        '<a href="open.html?id=%id%" class="card border-0 bg-transparent text-light">'+ 
            '<img src="%img%" alt="" class="card-img-top">'+
          '<div class="card-body ">'+
          '<h4>%name%</h4>'+
         '<span>%place%</span>'+
          '</div>'+
        '</a>'+
       '</div>';
    movie = movie.replace('%img%',IMAGE_PATH + item.poster_path);
    movie = movie.replace('%name%',item.title.slice(0,20));
    movie = movie.replace('%place%',item.release_date);
    movie = movie.replace('%id%',item.id);
    row.insertAdjacentHTML('beforeend', movie);
  }); 
}
}
    
    

function displaySingle(isLoading=true,movie={}){
  movieRow.innerHTML = '';
  if(isLoading){
     movieRow.insertAdjacentHTML('beforeend',spinner);
     }
     else if(Object.keys(movie).length){
    var open ='<div class="col-md-3">'+
       '<img src="%img%" alt="" class="card-img-top">'+
       '</div>'+
        '<div class="col-md-9">'+
        '<div class=" bg-transparent text-light">'+
          '<h4>%name%</h4>'+
         '<span class="text-muted">%place%</span>'+
         '<p class="py-4">%text%</p>'+
         '<a href="index.html" class="btn btn-danger text-uppercase mb-5">&larr;Back</a>'+
        '</div>'+
       '</div>';
    open = open.replace('%img%',IMAGE_PATH + movie.poster_path);
    open = open.replace('%name%',movie.title.slice(0,20));
    open = open.replace('%place%',movie.release_date);
    open = open.replace('%text%',movie.overview);
  
  movieRow.insertAdjacentHTML('beforeend',open);
  }   
}