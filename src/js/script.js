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
        if($(this).attr('id') == "gallery"){
        }
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
    $('.sub__bar_menu').on('click','div:not(.sub__bar_menu-item_active)', function(){
        $('.sub__container_padding20 section').removeClass('active');
        $('.main__items-wrapper').removeClass('main__items-wrapper_active');
        $(this).addClass('sub__bar_menu-item_active').siblings().removeClass('sub__bar_menu-item_active');
        if($(this).attr('id') == 'toLikes' ){
            $('.sub__likes .sub__breeds-container').html('');
            getLikes();
            
            $('.sub__likes').addClass('active').siblings().removeClass('active'); 
            
        }
        if($(this).attr('id') == 'toFavs'){
            $('.sub__favs .sub__breeds-container').html('');
            getFavs();
            $('.sub__favs').addClass('active').siblings().removeClass('active');
        }
        if($(this).attr('id') == 'toDislikes'){
            $('.sub__dislikes .sub__breeds-container').html('');
            getLikes();
            $('.sub__dislikes').addClass('active').siblings().removeClass('active');
        }
    });
    // voting rating buttons
    $('.sub__voting-estimate').on('click', 'div.sub__voting-estimate_item',function(){
        const date = new Date();
        let time = date.getHours() + ':' + date.getMinutes();
        let namee = $('.sub__voting-image img').attr('name').slice(0,19);
        let imgId = $('.sub__voting-image img').attr('ImgId');
        if(namee.length > 21){
            namee = namee.slice(0,20);
        }
        if($('.sub__voting-userlog').children().length == 4){
            $('.sub__voting-userlog').children()[3].remove();
        }
        if($(this).attr('id')=='like'){
            $('.sub__voting .sub__voting-userlog').prepend('<div class="sub__voting-userlog_timestamp">'+`${time}`+'<div class="sub__voting-userlog-messg">Image ID:<span>'+` ${imgId}` + '</span> was added to Likes</div><div class="sub__voting-userlog_timestamp-icon"><i class="icon-like-30"></div></div>');
            toLikes(imgId);
            getRandomDog();
        }
        if($(this).attr('id')=='fav'){
            $('.sub__voting .sub__voting-userlog').prepend('<div class="sub__voting-userlog_timestamp">'+`${time}`+'<div class="sub__voting-userlog-messg">Image ID:<span>'+` ${imgId}` + '</span> was added to Favourites</div><div class="sub__voting-userlog_timestamp-icon"><i class="icon-fav-30"></div></div>');
            toFavs(imgId);   
            
        }
        if($(this).attr('id')=='dis'){
            $('.sub__voting .sub__voting-userlog').prepend('<div class="sub__voting-userlog_timestamp">'+`${time}`+'<div class="sub__voting-userlog-messg">Image ID:<span>'+` ${imgId}` + '</span> was added to Dislikes</div><div class="sub__voting-userlog_timestamp-icon"><i class="icon-dislike-30"></div></div>');
            toDisLikes(imgId);
            getRandomDog();
            /* $('.sub__dislikes .sub__breeds-container').append('<div class="sub__breeds-container-item"><div class="wrapper"><div class="wrapper-placeholder">'+`${namee}`+'</div><img src="'+`${imgsrc}`+'" value="'+`${id}`+'" name="'+`${namee}`+'"></div></div>'); */
        }
    });
    // block of funcs to vote ********************************************
    async function getFavs(){
        const date = new Date();
        let time = date.getHours() + ':' + date.getMinutes();
        const data = await fetch(BASE_API_URL + 'favourites', {
            "headers": {"x-api-key": "c8affd4f-0aad-4f43-b0cf-dfa893cebea6",
            "method": "GET"
        }
        }).then(res=>res.json());
        data.forEach((e)=>{
            if(e.image.url === undefined){}
            else{$('.sub__favs .sub__breeds-container').prepend(`<div class="sub__breeds-container-item"><div class="wrapper"><div class="wrapper-placeholder wrapper-placeholder_heart" idd="${e.id}" imgid="${e.image_id}"><i class="icon-fav-full-white-20"></i><i class="icon-fav-20 hidden"></i></div><img src="${e.image.url}"></div></div>`);}
        });
        $('.sub__favs .wrapper-placeholder_heart').click(function(){
            $(this).children()[1].classList.remove('hidden');
            $(this).children()[0].remove();
            if($(this).children.length == 1){}
            else{
            const idd = $(this).attr('idd');
            const imgid = $(this).attr('imgid');
            deleteFav(idd);
            if($('.userlogfavs').children().length == 4){
                $('.userlogfavs').children()[3].remove();
            }
            $('.sub__favs .userlogfavs').prepend('<div class="sub__voting-userlog_timestamp">'+`${time}`+'<div class="sub__voting-userlog-messg">Image ID:<span>'+` ${imgid}` + '</span> was removed from Favourites</div><div class="sub__voting-userlog_timestamp-icon"><i class="icon-fav-30"></div></div>');}
        });
    }   
    async function toFavs(id){
        await fetch(BASE_API_URL + 'favourites', {
            method: 'POST', 
            body: JSON.stringify({"image_id":`${id}`,"sub_id":"maxeemja"}), 
            headers: {
              'Content-Type': 'application/json',
              "x-api-key": "c8affd4f-0aad-4f43-b0cf-dfa893cebea6"
            }
        });
        
    }
    async function deleteFav(id){
        await fetch(BASE_API_URL + 'favourites/' + id, {
            method: 'DELETE', 
            headers: {
              "x-api-key": "c8affd4f-0aad-4f43-b0cf-dfa893cebea6"
            }
        });
    }
    async function toLikes(id){
        await fetch(BASE_API_URL + 'votes', {
            method: 'POST', 
            body: JSON.stringify({"image_id":`${id}`,"sub_id":"maxeemja","value":"1"}), 
            headers: {
              'Content-Type': 'application/json',
              "x-api-key": "c8affd4f-0aad-4f43-b0cf-dfa893cebea6"
            }
        });
    }
    async function toDisLikes(id){
        await fetch(BASE_API_URL + 'votes', {
            method: 'POST', 
            body: JSON.stringify({"image_id":`${id}`,"sub_id":"maxeemja","value":"0"}), 
            headers: {
              'Content-Type': 'application/json',
              "x-api-key": "c8affd4f-0aad-4f43-b0cf-dfa893cebea6"
            }
        });
    }
    async function getLikes(){
        const data = await fetch(BASE_API_URL + 'votes', {
            "headers": {"x-api-key": "c8affd4f-0aad-4f43-b0cf-dfa893cebea6",
            "method": "GET"
        }
        }).then(res=>res.json());
        
        data.forEach(el=>{
            if(el.value == 1){getimg1(el.image_id, el.id);}
            if(el.value == 0){
                getimg2(el.image_id, el.id);
            }    
        }); 
        
        /* $('.sub__dislikes .sub__breeds-container-item').click(function(){
            const id = $(this).attr('idd');
            deleteLike(id);
            alert('Image was deleted from Dislikes');
        }); */
        async function getimg1(e, id){
            const response = await fetch(BASE_API_URL + `images/` + e);
            const res = await response.json();
            $('.sub__likes .sub__breeds-container').prepend(`<div class="sub__breeds-container-item" idd="${id}"><div class="wrapper"><div class="wrapper-placeholder">${res.breeds[0].name}</div><img src="${res.url}" value="${res.breeds[0].id}" name="${res.breeds[0].name}"></div></div>`);
            
        }
        async function getimg2(e, id){
            const response = await fetch(BASE_API_URL + `images/` + e);
            const res = await response.json();
            $('.sub__dislikes .sub__breeds-container').prepend(`<div class="sub__breeds-container-item" idd="${id}"><div class="wrapper"><div class="wrapper-placeholder">${res.breeds[0].name}</div><img src="${res.url}" value="${res.breeds[0].id}" name="${res.breeds[0].name}"></div></div>`);
            
        }
        
    }
    async function deleteLike(id){
        await fetch(BASE_API_URL + 'votes/' + id, {
            method: 'DELETE', 
            headers: {
              "x-api-key": "c8affd4f-0aad-4f43-b0cf-dfa893cebea6"
            }
        });
        alert('Image was deleted from Likes');
    }
    $('.sub__likes .sub__breeds-container-item').on('click', function(){
        const id = $(this).attr('idd');
        console.log(id);
        deleteLike(id);
    });
    // adding img to favs
    $('.sub__gallery .wrapper-placeholder_heart').click(function(e){
        const id = $(this).attr('idd');
        $(this).children().toggleClass('hidden');
        async function getData(){
            const data = await fetch(BASE_API_URL + 'favourites', {
                "headers": {"x-api-key": "c8affd4f-0aad-4f43-b0cf-dfa893cebea6",
                "method": "GET"
            }
            }).then(res=>res.json());
            let favId;
            await data.forEach(e=>{
                if(e.image_id == id){
                    favId = e.id;
                }
            });
            deleteFav(favId);
        }
        if(!$(this).attr('fav')){
            console.log('empty');
            $(this).attr('fav', 'true');
            toFavs(id);
        }
        else{
            $(this).removeAttr('fav');
            getData();
        }
    });
    //**********************************************************************
    // Fetching data from DogAPI
    let MyVariables = {};
    const BASE_API_URL = 'https://api.thedogapi.com/v1/';
    getGalleryContent();
    const fetchDoggoBreeds = async () =>{
        const response = await fetch(BASE_API_URL + 'breeds?attach_breed=0');
        const dogBreeds = await response.json();
        MyVariables.breedOptions = dogBreeds.map(breed =>{
            breed.text = breed.name;
            breed.value = breed.id;
            breed.url = breed.image.url;
            breed.reffImgId = breed.image.id;
            breed.for= breed.bred_for;
            return breed;
        });
        fillBreedsImgs();
        fillSelector();
    };

    console.log(MyVariables);
    async function getGalleryContent(){
        const response1 = await fetch(BASE_API_URL + 'images/search?mime_types=gif,jpg&limit=20');
        MyVariables.imgNgif = await response1.json();
        const response2 = await fetch(BASE_API_URL + 'images/search?mime_types=jpg&limit=20&order=Asc');
        MyVariables.imgg = await response2.json();
        const response3 = await fetch(BASE_API_URL + 'images/search?mime_types=gif&limit=20&order=Asc');
        MyVariables.gifs = await response3.json();
        $('.main__items-wrapper').eq(2).click(function(){
            $('.sub__gallery').addClass('active').siblings().removeClass('active');
            fillGalleryMix();
        });
        $('.sub__gallery .sub__gallery-subheader_dropdown_2').on('change',function(){
            if($(this).attr('value')=='mix'){fillGalleryMix();}
            if($(this).attr('value')=='img'){fillGalleryImg();}
            if($(this).attr('value')=='anim'){fillGalleryGif();}
        });
    }

    // filling images
    const fillBreedsImgs = () =>{  
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
    function fillSelector(){
        MyVariables.breedOptions.forEach((e)=>{
            document.querySelector('.sub__breeds-header_dropdown_1').innerHTML += `<option value="${e.name}">${e.name}</option>`;
            document.querySelector('.sub__gallery-subheader_dropdown_3').innerHTML += `<option label="${e.name}" value="${e.url}" >${e.name}</option>`;
        });
        
    }

    const fillGalleryMix = ()=>{
        $('.sub__gallery .wrapper').each(function(i,e){
            e.childNodes[0].setAttribute('idd', MyVariables.imgNgif[i].id);        
            e.lastElementChild.setAttribute('src', MyVariables.imgNgif[i].url);
        });
    };
    const fillGalleryImg = ()=>{
        $('.sub__gallery .wrapper').each(function(i,e){
            e.childNodes[0].setAttribute('idd', MyVariables.imgg[i].id);
            e.lastElementChild.setAttribute('src', MyVariables.imgg[i].url);
        });
    };
    const fillGalleryGif = ()=>{
        $('.sub__gallery .wrapper').each(function(i,e){
            e.childNodes[0].setAttribute('idd', MyVariables.gifs[i].id);
            e.lastElementChild.setAttribute('src', MyVariables.gifs[i].url);
        });
    };

    //search
    $('.sub__bar_search_rectangle').click(function(){
        $('.sub__search .sub__breeds-container').html('');
        let items = [];
        let value = $('.sub__bar_search input').attr('value');
        $('.sub__search-label span').text(value);
        $('.sub__bar_search input').attr('value', '');
        getDog();
        async function getDog(){
            const response = await fetch(BASE_API_URL + `breeds/search?q=${value}`);
            const res = await response.json();
            res.forEach(e=>{
                if(e.reference_image_id === undefined){}
                else{
                    getUrl(e.reference_image_id);
                }
            });
            
        }
        async function getUrl(e){
            const response = await fetch(BASE_API_URL + `images/` + e);
            const res = await response.json();
            let name = res.breeds[0].name;
            if(res.breeds[0].name.length>21){name = res.breeds[0].name.slice(0,21);}
            $('.sub__search .sub__breeds-container').append(`<div class="sub__breeds-container-item"><div class="wrapper"><div class="wrapper-placeholder">${name}</div><img src="${res.url}" value="${res.breeds[0].id}" alt=""></div></div>`);
            
            await items.push($('.sub__search .sub__breeds-container-item'));
            await $('.sub__search .wrapper').click(function(e){getDogInfo(e);});
        }
        $('.sub__search').addClass('active').siblings().removeClass('active');      
    });    
    
    // get the Info about a Dog
    $('.wrapper').not($('.sub__gallery .wrapper')).on('click', function(e){getDogInfo(e);});
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

    //choose breed in "Breeds"
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
        console.log(dataaa.name);
        if(dataaa.name.length > 21){
            dataaa.name = dataaa.name.slice(0,20);
        }
        $('.sub__breeds_chosen').addClass('active').siblings().addClass('hidden');
        $('.sub__breeds .sub__voting-header').removeClass('hidden');
        $('.sub__breeds_chosen .sub__breeds-container').html('<div class="sub__breeds-container-item"><div class="wrapper"><div class="wrapper-placeholder">'+`${dataaa.name}`+'</div><img src="'+`${dataaa.url}`+'" value="'+`${dataaa.value}`+'"></div></div>');
        $('.sub__breeds-header_dropdown_2 ,.sub__breeds .sub__breeds-header_sort-reversed, .sub__breeds-header_sort-normal').addClass('hidden');
        $('.sub__breeds_chosen .wrapper').click((e)=>{getDogInfo(e);});
        }
    });

    // choose breed filter in Gallery
    $('.sub__gallery-subheader_dropdown_3').on('change', function(){

        if($(this).attr('value')=='none'){
            $('.sub__gallery-subheader-item').eq(3).removeClass('hidden');
            $('.sub__gallery .sub__breeds-container')[4].remove();
            const value = $('.sub__gallery-subheader_dropdown_4').attr('value');
            switch(value){
                case '5':
                    $('.sub__gallery .sub__breeds-container').slice(0,1).removeClass('hidden');
                    break;
                case '10':
                    $('.sub__gallery .sub__breeds-container').slice(0,2).removeClass('hidden');
                    break;
                case '15':
                    $('.sub__gallery .sub__breeds-container').slice(0,3).removeClass('hidden');
                    break;
                case '20':
                    $('.sub__gallery .sub__breeds-container').slice(0,4).removeClass('hidden');
                    break;                
            }
        }
        else{
            $('.sub__gallery-subheader-item').eq(3).addClass('hidden');
            let src = $(this).attr('value');
            $('.sub__gallery .sub__breeds-container').slice(0,4).addClass('hidden');
            if($('.sub__gallery').children().length>6){$('.sub__gallery').children()[6].remove();}
            let elem = `<div class="sub__breeds-container">
            <div class="sub__breeds-container-item">
                <div class="wrapper">
                    <div class="wrapper-placeholder wrapper-placeholder_heart"><i class="icon-fav-20"></i><i class="icon-fav-full-white-20 hidden"></i></div>
                    <img src="${src}" alt="">
                </div>
            </div></div>`;
            $('.sub__gallery').append(elem);
            
        }
    });



    //reload btn
    const reload = $('.reload_btn').click(function(){
        const value = $('.sub__gallery-subheader_dropdown_2').attr('value');
        switch(value){
            case 'mix':
                getGalleryContent();
                fillGalleryMix();
                break;
            case 'img':
                getGalleryContent();
                fillGalleryImg();
                break;
            case 'anim':
                getGalleryContent();
                fillGalleryGif();
                break;
        }
    });
    //set limit for imgs/page
    $('.sub__breeds-header_dropdown_2').on('change',function(){
        let val = $(this).attr('value');
        console.log(val);
        let boxes = $('.sub__breeds').find('.sub__breeds-container');
        switch(val){
            case '5':
                boxes.eq(0).removeClass('hidden').siblings().addClass('hidden');
                break;
            case '10':
                boxes.eq(1).removeClass('hidden');
                $('.sub__breeds-container').slice(2,4).addClass('hidden');
                break;
            case '15':
                $('.sub__breeds-container').slice(1,3).removeClass('hidden');
                boxes.eq(3).addClass('hidden');
                break;
            case '20':
                $('.sub__breeds .sub__breeds-container').removeClass('hidden');
                break;             
        }

    } );
    $('.sub__gallery-subheader_dropdown_4').on('change',function(){
        let val = $(this).attr('value');
        let boxes = $('.sub__gallery').find('.sub__breeds-container');
        switch(val){
            case '5':
                boxes.eq(0).removeClass('hidden');
                boxes.slice(1,4).addClass('hidden');
                break;
            case '10':
                boxes.eq(1).removeClass('hidden');
                boxes.slice(2,4).addClass('hidden');
                break;
            case '15':
                boxes.slice(1,3).removeClass('hidden');
                boxes.eq(3).addClass('hidden');
                break;
            case '20':
                $('.sub__gallery .sub__breeds-container').removeClass('hidden');
                break;             
        }
    } );
    //revert sorting
    $('.sub__breeds-header_sort-reversed').not('.reload_btn').on('click', ()=>{
        document.querySelectorAll('.sub__breeds .wrapper').forEach((e,i)=>{
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
        document.querySelectorAll('.sub__breeds .wrapper').forEach((e,i)=>{
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
    // modal "upload" window
    $('.sub__gallery-header_upload').click(function(){
        $('.modal_bg, .modal_content').removeClass('hidden');
        $('.sub__bar').removeClass('sub__bar_active');
        $('.sub__gallery').removeClass('active');

    });
    $('.modal_content_close').click(function(){
        $('.modal_content, .modal_bg').addClass('hidden');
        $('.sub__bar').addClass('sub__bar_active');
        $('.sub__gallery').addClass('active');
    });
    // get random dog for voting section
    function getRandomDog(){
        let i = getRandomInt(171);
        try{$('.sub__voting-image img').attr('src', MyVariables.breedOptions[i].url);
        $('.sub__voting-image img').attr('ImgId', MyVariables.breedOptions[i].reffImgId);
        $('.sub__voting-image img').attr('value',MyVariables.breedOptions[i].id);
        $('.sub__voting-image img').attr('name', MyVariables.breedOptions[i].name);}
        catch(e){
            console.error(e);
            getRandomDog();
        }
    }
    //func for randomInt
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    fetchDoggoBreeds();

});