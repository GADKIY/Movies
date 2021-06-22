const MY_API_KEY = '81c3d339';


const app = Vue.createApp({
    data(){
        return{
            search:'Superman',
            // result: { "Search": [{ "Title": "Batman v Superman: Dawn of Justice", "Year": "2016", "imdbID": "tt2975590", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg" }, { "Title": "Superman Returns", "Year": "2006", "imdbID": "tt0348150", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BNzY2ZDQ2MTctYzlhOC00MWJhLTgxMmItMDgzNDQwMDdhOWI2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg" }, { "Title": "Superman", "Year": "1978", "imdbID": "tt0078346", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMzA0YWMwMTUtMTVhNC00NjRkLWE2ZTgtOWEzNjJhYzNiMTlkXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg" }, { "Title": "Superman II", "Year": "1980", "imdbID": "tt0081573", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BODk2NjgzNTEtYzZhZC00ZTBkLTllMGQtMmMxMzU1NDRkM2RlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg" }, { "Title": "Superman III", "Year": "1983", "imdbID": "tt0086393", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMzI3ZDllMTctNmI2Mi00OGQ4LTk2ZTQtYTJhMjA5ZGI2YmRkXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg" }, { "Title": "Superman IV: The Quest for Peace", "Year": "1987", "imdbID": "tt0094074", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMmIwZWY1YTYtNDlhOS00NDRmLWI4MzItNjk2NDc1N2NhYzNlXkEyXkFqcGdeQXVyNTUyMzE4Mzg@._V1_SX300.jpg" }, { "Title": "Superman/Batman: Apocalypse", "Year": "2010", "imdbID": "tt1673430", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMjk3ODhmNjgtZjllOC00ZWZjLTkwYzQtNzc1Y2ZhMjY2ODE0XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg" }, { "Title": "Superman/Batman: Public Enemies", "Year": "2009", "imdbID": "tt1398941", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BZDc5NTFiMzgtZWJiOS00N2M1LWJmOGYtZmNjMzFhMzcxZjRiXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg" }, { "Title": "Lois & Clark: The New Adventures of Superman", "Year": "1993–1997", "imdbID": "tt0106057", "Type": "series", "Poster": "https://m.media-amazon.com/images/M/MV5BZTU1ZGFjNzEtZWYzZC00ZmI0LTg2NmMtN2YyNTY4YzhlODIyXkEyXkFqcGdeQXVyMjExMjk0ODk@._V1_SX300.jpg" }, { "Title": "Superman: Doomsday", "Year": "2007", "imdbID": "tt0934706", "Type": "movie", "Poster": "https://m.media-amazon.com/images/M/MV5BMmJhN2RmMTUtMDMzMy00YTQ4LWEyZDMtOGM1NWVmMDE3NTBjXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg" }], "totalResults": "256", "Response": "True" },
            result:{},
            details:{},
            showModal: false,
            type:'',
            year:'',
            fav_list:[],
            showPanel: false,
            page:1,
            rowView:false,
            search_history:[]
        }
    },
    created(){
        this.fav_list = localStorage.getItem('fav_movie') != null ? JSON.parse(localStorage.getItem('fav_movie')):[];
        this.search_history = localStorage.getItem('history')!=null? JSON.parse(localStorage.getItem('history')):[];
        if(localStorage.getItem('view')!=null){
            this.rowView = (localStorage.getItem('view') === 'true');
        }
    },
    methods:{
        searchMovie(e){
            e.preventDefault();
            if(this.search!==""){                
                if(this.search_history.indexOf(this.search.toLowerCase())===-1){
                    if(this.search_history.length==10){
                        this.search_history.pop();
                    }
                    this.search_history.unshift(this.search.toLowerCase());
                    localStorage.setItem('history', JSON.stringify(this.search_history))
                }
                this.page = 1;
                axios
                    .get('https://www.omdbapi.com/?apikey=' + MY_API_KEY + '&s=' + this.search+'&type='+this.type+'&y='+this.year+'&page='+this.page)
                    .then((resp)=>{
                        // this.result = resp.data;
                        this.changeStar(resp.data);
                    })
            }else{
                console.warn('Enter search request')
            }
        },
        goToPage(new_page){
            this.page = new_page;
            axios
                .get('https://www.omdbapi.com/?apikey=' + MY_API_KEY + '&s=' + this.search + '&type=' + this.type + '&y=' + this.year + '&page=' + this.page)
                .then((resp) => {
                    this.changeStar(resp.data);
                })
        },
        moreInfo(imdbID){
            axios
                .get('https://www.omdbapi.com/?apikey=' + MY_API_KEY + '&i=' + imdbID +'&plot=full')
                .then((resp)=>{
                    this.details = resp.data;
                    this.showModal = true;
                })
        },
        changeStar(rez) {
            let rds = rez.Search;
            for (let i = 0; i < rds.length; i++) {
                const ind = this.fav_list.findIndex((el) => el.imdbID === rds[i].imdbID);
                if (ind != -1) {
                    rds[i].inFav = true;
                } else {
                    rds[i].inFav = false;
                }
            }
            this.result.Search = rds;
            this.result.totalResults = parseInt(rez.totalResults);
        },
        toggleFav(imdbID){
            if(this.fav_list.length!==0){
               const ind =  this.fav_list.findIndex((el) => el.imdbID === imdbID);
               if(ind!==-1){
                   this.fav_list.splice(ind, 1);
                }else{
                   const fav_item = this.result.Search.find((el) => el.imdbID === imdbID);
                   this.fav_list.push(fav_item);
               }
            }else{
               const fav_item =  this.result.Search.find((el)=>el.imdbID === imdbID);
               this.fav_list.push(fav_item);

           }
            this.changeStar(this.result);
            localStorage.setItem('fav_movie', JSON.stringify(this.fav_list));

        },
        closePanel() {
            this.showPanel = false;
        },
        changeView(is_row){
            this.rowView = is_row;
            localStorage.setItem('view', is_row);
        }
    }
});


app.component('movie-ratings', {
    props:['ratings'],
    data(){
        return{
            ratings_list:[]
        }
    },
    watch:{
        ratings(new_val){
            console.log(new_val);
            this.ratings_list = typeof new_val==="object"?new_val:[];
            for(let i=0; i<this.ratings_list.length;i++){
                switch (this.ratings_list[i].Source) {
                    case 'Internet Movie Database':
                        this.ratings_list[i].Width = 100 - parseFloat(this.ratings_list[0].Value.split('/')[0]) * 10;
                        break;
                    case 'Rotten Tomatoes':
                        this.ratings_list[i].Width = 100 - parseInt(this.ratings_list[1].Value);
                        break;
                    case 'Metacritic':
                        this.ratings_list[i].Width = 100 - parseInt(this.ratings_list[2].Value.split('/')[0]);
                        break;
                }
            }
        }
    },
    template:'#ratings_list',
});

app.component('fav_panel',{
    props:['list', 'show'],
    methods: {
        moreInfo(imdbID){
            this.$parent.moreInfo(imdbID);
        },
        closePanel(){
            this.$parent.closePanel();
        },
        toggleFav(imdbID){
            this.$parent.toggleFav(imdbID);
        }
    },
    template: '#fav_panel',
});

app.component('pagination', {
    props:['page', 'total_items'],
    data(){
        return{
            total_pages:0,
            per_page:10,
            // new_page:1
        }
    },
    watch:{
        total_items(new_val){
            this.total_pages = Math.ceil(new_val / this.per_page);
        } 
            
    },
    template: '#pagination',
    methods:{
        goToPage(num){
            this.$parent.goToPage(num);
        },
        goToPrev(){
            /* this.new_page = (this.page!==1)?this.page:0;
            if(this.new_page===0){
                return false;
            } */
            this.$parent.goToPage(this.page-1);

        },
        goToNext(){
            /* this.new_page = (this.page!==this.total_pages)?this.page+1:0;
            if(this.page===0){
                return false;
            } */
            this.$parent.goToPage(this.page+1);
        }
    }
});

app.mount("#app");