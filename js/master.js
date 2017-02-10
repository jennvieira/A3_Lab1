(function(){

var carImage = document.querySelectorAll('.thumbInfo img'),
    carName = document.querySelector('.modelName'),
    carPrice= document.querySelector('.priceInfo'),
    carDetails= document.querySelector('.modelDetails');

    function makeRequest(){
			httpRequest = new XMLHttpRequest();

			if(!httpRequest){
				return false;
			}

			httpRequest.onreadystatechange = showCarInfo;
			httpRequest.open('GET', 'includes/ajaxQuery.php' + '?model=' + this.id);  //'?' = php caller
			httpRequest.send();
		}

    function showCarInfo(){

      if(httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200){
        //parse stringfield result
        var carData = JSON.parse(httpRequest.responseText);
        carImage.src = "images/" + carData.carImage + '.png';
        carName.firstChild.nodeValue = carData.modelName;
        carPrice.firstChild.nodeValue = carData.pricing;
        carDetails.firstChild.nodeValue = carData.modelDetails;


        [].forEach.call(document.querySelectorAll('.hidden'), function(item){
          item.classList.remove('hidden');
        });
      }
    }


    [].forEach.call(carImage, function(img) {
      img.addEventListener('click', makeRequest, false);

    });


})();
