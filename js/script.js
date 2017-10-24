$(function(){
	const $inputTag = $('input[name=tag]'),
		  $buttonSubmit = $('.btn-search'),
		  $listOfPhotos = $('.photos__list'),
		  apiUrl = 'http://api.flickr.com/services/feeds/photos_public.gne?&format=json&jsoncallback=?',
		  $form = $('.form');
	

	
	function handleSearching(){

		$listOfPhotos.find('li').remove();

		$.ajax({
			url: apiUrl,
			dataType: 'jsonp',
			data: {
				tags: '"' + $inputTag.val() + '"'
					},
			success: function(response){

				var arrItems = [];
				arrItems= response.items;

				$.each(arrItems, function(){
					let picture = $('<li><img class="picture" src="'+ this.media.m + '" '+ 'alt="' + $inputTag.val()+'"></li>');

					$listOfPhotos.append(picture);
				});
			}
		})	
	}



	$buttonSubmit.click(function(){
		handleSearching();
	});
	$('body').keyup(function(e){
		let key = e.keyCode || e.which;
		if( key == '13'){
			tag = $inputTag.val()
			handleSearching();
			$inputTag.blur();
		}
		
	});
	
	function setFilters(){
		const nameCssProperty = this.name,
	 	valueCssProperty = this.value;
		$('img').css('filter',`${nameCssProperty}(${valueCssProperty}%)`);
	}
	
	 $form.on('change', 'input', setFilters)
	 $form.on('mousemove', 'input', setFilters)
	
});