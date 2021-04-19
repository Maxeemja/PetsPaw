

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
        document.querySelectorAll('.wrapper').forEach((e)=>{
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
    $('.sub__breeds-container .wrapper').on('click', (e)=>{
            let index = e.target.lastElementChild.getAttribute('value');
            console.log(index);
            let idd;
            for(let i=0; i<172; i++){
                if(MyVariables.breedOptions[i].id == index){
                    idd = i;
                    break;
                }
            }
            console.log(idd);
            $('.sub__breeds').removeClass('active');
            $('.sub__descr').addClass('active');
            $('#descr_img').attr('src', e.target.lastElementChild.getAttribute('src'));
            $('.sub__descr-info_label').text(MyVariables.breedOptions[idd].name.slice(0,17));
            $('.sub__descr-info_text_subheader').text(MyVariables.breedOptions[idd].for);
            $('.sub__descr-id').text(e.target.lastElementChild.getAttribute('value'));
            $('.sub__descr-info_text_left div').text(MyVariables.breedOptions[idd].temperament);
            $('.sub__descr-info_text_right div').eq(0).text(MyVariables.breedOptions[idd].height.metric + ` cm`);
            $('.sub__descr-info_text_right div').eq(1).text(MyVariables.breedOptions[idd].weight.metric + ` kgs`);
            $('.sub__descr-info_text_right div').eq(2).text(MyVariables.breedOptions[idd].life_span);
    });

    //set limit for imgs/page
    $('.sub__breeds-header_dropdown_2').on('click', (e)=>{
        console.log(e.target);
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


    //func for randomInt
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    fetchDoggoBreeds();


});