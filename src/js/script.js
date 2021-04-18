$(document).ready(function(){
    // switching active tabs
    $('.main__items').on('click', 'div:not(.main__items-wrapper_active)', function() { 
        $(this).addClass('main__items-wrapper_active').siblings().removeClass('main__items-wrapper_active');
        $('.sub__container').css('background', '#fff');
        $('.sub__home').addClass('hidden');
        $('.sub__bar').addClass('sub__bar_active');
        if($(this).attr('id') == "voting"){$('.sub__voting').addClass('active').siblings().removeClass('active');}
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
    });
    
    
    // Fetching data from DogAPI
    
    const BASE_API_URL = 'https://api.thedogapi.com/v1/';
    const fetchDoggoBreeds = async () =>{
       const response = await fetch(BASE_API_URL + 'breeds');
       const dogBreeds = await response.json();
       getBreedsOptions(dogBreeds);
    };
    // filling images
    const getBreedsOptions = (breeds) =>{  
        const breedOptions = breeds.map(breed =>{
            breed.text = breed.name;
            breed.value = breed.id;
            breed.url = breed.image.url;
            breed.reffImgId = breed.image.id;
            return breed;
        });
        fillDogImgs(breedOptions);
        fillSelector(breedOptions);
    };


    
    let imgs = [];
    const fillDogImgs = (breedOpts) =>{
        document.querySelectorAll('.sub__breeds-container_1-item img').forEach(e=>{imgs.push(e);});
        document.querySelectorAll('.sub__breeds-container_2-item img').forEach(e=>{imgs.push(e);});
        imgs.forEach((e)=>{
            let i = getRandomInt(171);
            e.setAttribute('src', breedOpts[i].url);
            e.setAttribute('name', breedOpts[i].text);
            e.setAttribute('ImgId', breedOpts[i].reffImgId);
/*             let j = 171 - i;
            e.setAttribute('src', breedOptions[j].url);
            e.setAttribute('name', breedOptions[j].text);
            e.setAttribute('ImgId', breedOptions[j].reffImgId); */
        });
        showBreedOnHover(imgs);
    };
    
/*     $('.sub__breeds-header_sort-reversed').on('click', ()=>{
        console.log(imgs);
        imgs.forEach((e,i)=>{
            let j = 171 - i;
            e.setAttribute('src', e.url);
            e.setAttribute('name', e.text);
            e.setAttribute('ImgId', e.reffImgId);
        });
    }); */
    function fillSelector(breeds){
        breeds.forEach((e)=>{
            document.querySelector('.sub__breeds-header_dropdown_1').innerHTML += `<option value="${e.name}" >${e.name}</option>`;
        });
    }
    console.log(document.querySelectorAll('.sub__breeds-header_dropdown_2 option'));

    document.querySelectorAll('.sub__breeds-header_dropdown_2 option').forEach(e=>{
        console.log('222222222');
        e.addEventListener('click', (event)=>{
            if(e.getAttribute('value') == 5){console.log('!!');}
        });
    }); 

    const showBreedOnHover = (img) => {
        img.forEach(e=>{
            e.name.replace(/\(/, '');
            if(e.name.length > 21){
                e.name = e.name.slice(0,21);   
            }
            e.previousElementSibling.innerHTML= e.name;
        });
    };
    

    //func for randomInt
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    fetchDoggoBreeds();
});