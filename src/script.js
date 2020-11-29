var vm = new Vue({
  el: "#app",
  data: {
    movies: [],
    favorite: [],
    currentMovie: null,
    isFavoriteOpen: false
  },
  created(){
    let key = "b14b998a2f293d546242e08f1ebf82ac"
    let apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + key
    axios.get(apiUrl,{
      params: {
        sort_by: "popularity.desc",
        page: 1
      }
    })
      .then(res=>{
        console.log(res.data.results[0])
        this.movies = res.data.results
    })
  },
  watch: {
    cart(){
      TweenMax.fromTo(".fa-shopping-cart",0.3,{
        scale: 0.5
      },{
        scale: 1
      })
    }
  },
  computed:{
    totalPrice(){
      return this.cart
        .map(movie=>movie.price)
        .reduce((total,p)=>total+p,0)
    }
  },
  methods: {
    bgcss(url){
      return {
        'background-image': 'url(https://image.tmdb.org/t/p/w440_and_h660_face/'+url+')',
        'background-position': 'center center',
        'background-size': 'cover'
      }
    },
    voteColor(num){
      if(num>=8) return {'color': '#f22a1f', 'text-shadow': '0px 0px 5px #f22a1f'}
      else if(num>=7) return {'color': '#f78009', 'text-shadow': '0px 0px 5px #f78009'}
      else if(num>=6) return {'color': '#f4ba0c', 'text-shadow': '0px 0px 5px #f4ba0c'}
      else if(num>=5) return {'color': '#b6e01d', 'text-shadow': '0px 0px 5px #b6e01d'}
      else return {'color': '#38a51a', 'text-shadow': '0px 0px 5px #38a51a'}
    },
    wheel(evt){
      let move = evt.deltaY*2
      let currentLeft = 
parseInt($(".cards").css("left"))
      let minLeft = -(this.movies.length-1)*620
      // console.log(currentLeft, move)
      if(currentLeft>=0 && move<0)
        move = 0
      else if(currentLeft<minLeft && move>0)
        move = 0
      TweenMax.to(".cards",0.8,{
        left: "-=" + move + "px"
      })
    },
    addFavorite(movie,evt){
      this.currentMovie = movie
      // 將元件更新後再執行動畫的更新
      this.$nextTick(()=>{
        // console.log($(evt.target).offset())
        TweenMax.fromTo(".buybox",0.5,{
          // jQuery CSS 操作 - offset() 方法
          left: $(evt.target).offset().left,
          top: $(evt.target).offset().top,
          opacity: 1,
          ease: "power1.out"
        },{
          left: $(".fixed-control").offset().left,
          top: $(".fixed-control").offset().top,
          opacity: 0
        })
        
        setTimeout(()=>{
          this.favorite.push(movie)
        },500)
      })
    },
    removeFavorite(movie){
      this.favorite.pop(movie)
    }
  }
})