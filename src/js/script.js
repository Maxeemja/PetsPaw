$(document).ready(function(){
    // switching active tabs
    $('.main__items').on('click', 'div:not(.main__items-wrapper_active)', function() { 
        $(this).addClass('main__items-wrapper_active').siblings().removeClass('main__items-wrapper_active');
        $('.sub__container').css('background', '#fff');
        $('.sub__home').addClass('hidden');
        $('.sub__bar').addClass('sub__bar_active');
        $('.sub__bar_menu-item').removeClass('sub__bar_menu-item_active');
        if($(this).attr('id') == "voting"){$('.sub__voting').addClass('active').siblings().removeClass('active');
        getRandomDog();    
        }
        if($(this).attr('id') == "breeds"){$('.sub__breeds').addClass('active').siblings().removeClass('active');}
        if($(this).attr('id') == "gallery"){$('.sub__home').addClass('hidden');}
    });
    // "back" button
    $('.sub__voting-header_rectangle').on('click', ()=>{ 
        $('.sub__home').removeClass('hidden');
        $('.sub__container').css('background', '$main-color');
        $('.sub__container_padding20 section').removeClass('active');
        $('.sub__bar').removeClass('sub__bar_active');
        $('.main__items-wrapper').removeClass('main__items-wrapper_active');
        $('.sub__bar_menu-item').removeClass('sub__bar_menu-item_active');
    });
    // menu buttons
/*     $('.sub__bar_menu i').on('click',(e)=>{
        e.stopPropagation();
    }); */
    $('.sub__bar_menu').on('click','div:not(.sub__bar_menu-item_active)', function(){
        $('.sub__container_padding20 section').removeClass('active');
        $('.main__items-wrapper').removeClass('main__items-wrapper_active');
        $(this).addClass('sub__bar_menu-item_active').siblings().removeClass('sub__bar_menu-item_active');
        if($(this).attr('id') == 'toLikes' ){
            $('.sub__likes').addClass('active').siblings().removeClass('active'); 
        }
        if($(this).attr('id') == 'toFavs'){
            $('.sub__favs').addClass('active').siblings().removeClass('active');
        }
        if($(this).attr('id') == 'toDislikes'){
            $('.sub__dislikes').addClass('active').siblings().removeClass('active');
        }
    });
    // voting rating buttons
    $('.sub__voting-estimate').on('click', 'div.sub__voting-estimate_item',function(){
        const date = new Date();
        let time = date.getHours() + ':' + date.getMinutes();
        let imgsrc = $('.sub__voting-image img').attr('src');
        let namee = $('.sub__voting-image img').attr('name').slice(0,19);
        let id = $('.sub__voting-image img').attr('value');
        let imgId = $('.sub__voting-image img').attr('ImgId');
        if($('.sub__voting-userlog').children().length == 4){
            $('.sub__voting-userlog').children()[3].remove();
        }
        if($(this).attr('id')=='like'){
            $('.sub__voting-userlog').prepend('<div class="sub__voting-userlog_timestamp">'+`${time}`+'<div class="sub__voting-userlog-messg">Image ID:<span>'+` ${imgId}` + '</span> was added to Likes</div><div class="sub__voting-userlog_timestamp-icon"><i class="icon-like-30"></div></div>');
            getRandomDog();
            $('.sub__likes .sub__breeds-container').append('<div class="sub__breeds-container-item"><div class="wrapper"><div class="wrapper-placeholder">'+`${namee}`+'</div><img src="'+`${imgsrc}`+'" value="'+`${id}`+'" name="'+`${namee}`+'"></div></div>');
        }
        if($(this).attr('id')=='fav'){
            $('.sub__voting-userlog').prepend('<div class="sub__voting-userlog_timestamp">'+`${time}`+'<div class="sub__voting-userlog-messg">Image ID:<span>'+` ${imgId}` + '</span> was added to Favourites</div><div class="sub__voting-userlog_timestamp-icon"><i class="icon-fav-30"></div></div>');
            getRandomDog();
            $('.sub__favs .sub__breeds-container').append('<div class="sub__breeds-container-item"><div class="wrapper"><div class="wrapper-placeholder wrapper-placeholder_heart"><i class="icon-fav-full-white-20"></i></div><img src="'+`${imgsrc}`+'"></div></div>');
        }

        if($(this).attr('id')=='dis'){
            $('.sub__voting-userlog').prepend('<div class="sub__voting-userlog_timestamp">'+`${time}`+'<div class="sub__voting-userlog-messg">Image ID:<span>'+` ${imgId}` + '</span> was added to Dislikes</div><div class="sub__voting-userlog_timestamp-icon"><i class="icon-dislike-30"></div></div>');
            getRandomDog();
            $('.sub__dislikes .sub__breeds-container').append('<div class="sub__breeds-container-item"><div class="wrapper"><div class="wrapper-placeholder">'+`${namee}`+'</div><img src="'+`${imgsrc}`+'" value="'+`${id}`+'" name="'+`${namee}`+'"></div></div>');
        }
        $('.sub__likes .wrapper , .sub__dislikes .wrapper').on('click', (e)=>{getDogInfo(e);});
    });

    // Fetching data from DogAPI
    var MyVariables = {};
    const BASE_API_URL = 'https://api.thedogapi.com/v1/';
    const fetchDoggoBreeds = async () =>{
        const response = await fetch(BASE_API_URL + 'breeds');
        const dogBreeds = await response.json();
        MyVariables.breedOptions = dogBreeds.map(breed =>{
            breed.text = breed.name;
            breed.value = breed.id;
            breed.url = breed.image.url;
            breed.reffImgId = breed.image.id;
            breed.for= breed.bred_for;
            return breed;
        });
        fillDogImgs(MyVariables.breedOptions);
        fillSelector(MyVariables.breedOptions);
    };
    console.log(MyVariables);
    // filling images
    const fillDogImgs = (breedOpts) =>{  
        document.querySelectorAll('.sub__breeds .wrapper').forEach((e)=>{
            let i = getRandomInt(171);
            let ell = document.createElement('img');
            ell.setAttribute('src', MyVariables.breedOptions[i].url);
            ell.setAttribute('value', MyVariables.breedOptions[i].id);
            e.append(ell);
            if(MyVariables.breedOptions[i].name.length > 21){
                MyVariables.breedOptions[i].name = MyVariables.breedOptions[i].name.slice(0,20);
            }
            e.childNodes[0].innerHTML = MyVariables.breedOptions[i].name;
        });
    };
    //filling selector
    function fillSelector(breeds){
        breeds.forEach((e)=>{
            document.querySelector('.sub__breeds-header_dropdown_1').innerHTML += `<option value="${e.name}" >${e.name}</option>`;
        });
    }
    // get the Info about a Dog
    $('.wrapper').on('click', (e)=>{getDogInfo(e);});
    function getDogInfo(e){
        let index = e.target.lastElementChild.getAttribute('value');
            let idd;
            for(let i=0; i<172; i++){
                if(MyVariables.breedOptions[i].id == index){
                    idd = i;
                    break;
                }
            }
            $('.sub__breeds').removeClass('active').siblings().removeClass('active');
            $('.sub__descr').addClass('active');
            $('#descr_img').attr('src', e.target.lastElementChild.getAttribute('src'));
            $('.sub__descr-info_label').text(MyVariables.breedOptions[idd].name.slice(0,17));
            $('.sub__descr-info_text_subheader').text(MyVariables.breedOptions[idd].for);
            $('.sub__descr-id').text(e.target.lastElementChild.getAttribute('value'));
            $('.sub__descr-info_text_left div').text(MyVariables.breedOptions[idd].temperament);
            $('.sub__descr-info_text_right div').eq(0).text(MyVariables.breedOptions[idd].height.metric + ` cm`);
            $('.sub__descr-info_text_right div').eq(1).text(MyVariables.breedOptions[idd].weight.metric + ` kgs`);
            $('.sub__descr-info_text_right div').eq(2).text(MyVariables.breedOptions[idd].life_span);
    }

    //choose breed
    $('.sub__breeds-header_dropdown_1').on('change', function(){
        let dataaa;
        if($(this).attr('value')=='all'){
            $('.sub__breeds_chosen').removeClass('active').siblings('div.sub__breeds-main_container').removeClass('hidden');
            $('.sub__breeds-header_dropdown_2 , .sub__breeds-header_sort-reversed, .sub__breeds-header_sort-normal').removeClass('hidden');
        }
        else{
        MyVariables.breedOptions.forEach(e=>{
        if($(this).attr('value')==e.name){
            dataaa = {url:e.url,value:e.id,name:e.name,temperament:e.temperament,for:e.bred_for,weight:e.weight.metric+' kgs',height:e.height.metric+' cm',lifespan:e.life_span};
        }
        });
        $('.sub__breeds_chosen').addClass('active').siblings().addClass('hidden');
        $('.sub__breeds .sub__voting-header').removeClass('hidden');
        $('.sub__breeds_chosen .sub__breeds-container').html('<div class="sub__breeds-container-item"><div class="wrapper"><div class="wrapper-placeholder">'+`${dataaa.name}`+'</div><img src="'+`${dataaa.url}`+'" value="'+`${dataaa.value}`+'"></div></div>');
        $('.sub__breeds-header_dropdown_2 , .sub__breeds-header_sort-reversed, .sub__breeds-header_sort-normal').addClass('hidden');
        $('.sub__breeds_chosen .wrapper').click((e)=>{getDogInfo(e);});
        }
    });

    //set limit for imgs/page
    $('.sub__breeds-header_dropdown_2').on('change', function(e){
        let val = $(this).attr('value');
        switch(val){
            case '5':
                $('.sub__breeds-container').eq(0).removeClass('hidden').siblings().addClass('hidden');
                break;
            case '10':
                $('.sub__breeds-container').eq(1).removeClass('hidden');
                $('.sub__breeds-container:nth-of-type(3),.sub__breeds-container:nth-of-type(4)').addClass('hidden');
                break;
            case '15':
                $('.sub__breeds-container:nth-of-type(2),.sub__breeds-container:nth-of-type(3)').removeClass('hidden');
                $('.sub__breeds-container:nth-of-type(4)').addClass('hidden');
                break;
            case '20':
                $('.sub__breeds-container').removeClass('hidden');
                break;             
        }
    });
    //revert sorting
    $('.sub__breeds-header_sort-reversed').on('click', ()=>{
        document.querySelectorAll('.wrapper').forEach((e,i)=>{
            e.firstElementChild.innerHTML = '';
            if(e.childNodes.length > 1){e.lastElementChild.remove();} 
            let j = 171 - i;
            let ell = document.createElement('img');
            ell.setAttribute('src', MyVariables.breedOptions[j].url);
            ell.setAttribute('value', MyVariables.breedOptions[j].id);
            e.append(ell);
            if(MyVariables.breedOptions[i].name.length > 21){
                MyVariables.breedOptions[i].name = MyVariables.breedOptions[j].name.slice(0,21);
            }
            e.childNodes[0].innerHTML = MyVariables.breedOptions[j].name;
        });
    });
    //normal sorting
    $('.sub__breeds-header_sort-normal').on('click', ()=>{
        document.querySelectorAll('.wrapper').forEach((e,i)=>{
            e.firstElementChild.innerHTML = '';
            if(e.childNodes.length > 1){e.lastElementChild.remove();} 
            let ell = document.createElement('img');
            ell.setAttribute('src', MyVariables.breedOptions[i].url);
            ell.setAttribute('value', MyVariables.breedOptions[i].id);
            e.append(ell);
            if(MyVariables.breedOptions[i].name.length > 21){
                MyVariables.breedOptions[i].name = MyVariables.breedOptions[i].name.slice(0,21);
            }
            e.childNodes[0].innerHTML = MyVariables.breedOptions[i].name;
        });
    });

    // get random dog for voting section
    function getRandomDog(){
        let i = getRandomInt(171);
        $('.sub__voting-image img').attr('src', MyVariables.breedOptions[i].url);
        $('.sub__voting-image img').attr('ImgId', MyVariables.breedOptions[i].reffImgId);
        $('.sub__voting-image img').attr('value',MyVariables.breedOptions[i].id);
        $('.sub__voting-image img').attr('name', MyVariables.breedOptions[i].name);
    }

    //func for randomInt
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    fetchDoggoBreeds();

});