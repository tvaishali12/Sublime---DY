/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Search
4. Init Menu
5. Init Isotope


******************************/

$(document).ready(function () {
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var hambActive = false;
	var menuActive = false;

	setHeader();

	$(window).on('resize', function () {
		setHeader();
	});

	$(document).on('scroll', function () {
		setHeader();
	});

	initSearch();
	initMenu();
	initIsotope();

	/* 

	2. Set Header

	*/

	function setHeader() {
		if ($(window).scrollTop() > 100) {
			header.addClass('scrolled');
		}
		else {
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Search

	*/

	function initSearch() {
		if ($('.search').length && $('.search_panel').length) {
			var search = $('.search');
			var panel = $('.search_panel');

			search.on('click', function () {
				panel.toggleClass('active');
			});
		}
	}

	/* 

	4. Init Menu

	*/

	function initMenu() {
		if ($('.hamburger').length) {
			var hamb = $('.hamburger');

			hamb.on('click', function (event) {
				event.stopPropagation();

				if (!menuActive) {
					openMenu();

					$(document).one('click', function cls(e) {
						if ($(e.target).hasClass('menu_mm')) {
							$(document).one('click', cls);
						}
						else {
							closeMenu();
						}
					});
				}
				else {
					$('.menu').removeClass('active');
					menuActive = false;
				}
			});

			//Handle page menu
			if ($('.page_menu_item').length) {
				var items = $('.page_menu_item');
				items.each(function () {
					var item = $(this);

					item.on('click', function (evt) {
						if (item.hasClass('has-children')) {
							evt.preventDefault();
							evt.stopPropagation();
							var subItem = item.find('> ul');
							if (subItem.hasClass('active')) {
								subItem.toggleClass('active');
								TweenMax.to(subItem, 0.3, { height: 0 });
							}
							else {
								subItem.toggleClass('active');
								TweenMax.set(subItem, { height: "auto" });
								TweenMax.from(subItem, 0.3, { height: 0 });
							}
						}
						else {
							evt.stopPropagation();
						}
					});
				});
			}
		}
	}

	function openMenu() {
		var fs = $('.menu');
		fs.addClass('active');
		hambActive = true;
		menuActive = true;
	}

	function closeMenu() {
		var fs = $('.menu');
		fs.removeClass('active');
		hambActive = false;
		menuActive = false;
	}

	/* 

	5. Init Isotope

	*/

	function initIsotope() {
		var sortingButtons = $('.product_sorting_btn');
		var sortNums = $('.num_sorting_btn');

		if ($('.product_grid').length) {
			var grid = $('.product_grid').isotope({
				itemSelector: '.product',
				layoutMode: 'fitRows',
				fitRows:
				{
					gutter: 30
				},
				getSortData:
				{
					price: function (itemElement) {
						var priceEle = $(itemElement).find('.product_price').text().replace('$', '');
						return parseFloat(priceEle);
					},
					name: '.product_name',
					stars: function (itemElement) {
						var starsEle = $(itemElement).find('.rating');
						var stars = starsEle.attr("data-rating");
						return stars;
					}
				},
				animationOptions:
				{
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});

			// Sort based on the value from the sorting_type dropdown
			sortingButtons.each(function () {
				$(this).on('click', function () {
					var parent = $(this).parent().parent().find('.sorting_text');
					parent.text($(this).text());
					var option = $(this).attr('data-isotope-option');
					option = JSON.parse(option);
					grid.isotope(option);
				});
			});
		}
	}

});


function getPrices() {
	var child = document.getElementsByClassName("product_price");
	var prices = []
	for (var i = 0; i < child.length; i++) {
	  var childs = child[i];
	//   console.log(childs);
	  childs.addEventListener("click", (e) => {
		// alert(e.target.innerText)
		// console.log("udf");
		// return e.target.innerText;
		var price = e.target.innerText
		prices.push(price)
		console.log(prices)
	  });
	}
	 return prices
  }
  getPrices();
//   var getPrice = getPrices();

// function getBtnText() {
// 	var btnText = document.getElementsByClassName("newsletter_button")[0];
// 	// var btnText = document.querySelector(".newsletter_button");
// btnText.addEventListener('click' ,() => {
// 	console.log("uhui")
// 	return btnText.innerText
// 	});

// }
// getBtnText();



//------------------------------ecoomerce event using native implementation-----------------------
var clickTex = document.querySelectorAll("body > div.super_container > div.products > div > div:nth-child(2) > div > div.product_grid > div:nth-child(2) > div.product_content > div.product_title > a");

clickTex.forEach(function(clickTEXT) {
  clickTEXT.addEventListener('click', function(e) {
    // var texts = clickTEXT.innerText;
	console.log("vaishaliiiiiiii")
	gtag("event", "select_item_list", {
		item_list_id: "related_products",
		item_list_name: "Related products",
		items: [
		  {
			item_id: "SKU_12345",
			item_name: "Stan and Friends Tee",
			affiliation: "Google Merchandise Store",
			coupon: "SUMMER_FUN",
			discount: 2.22,
			index: 0,
			item_brand: "Google",
			item_category: "Apparel",
			item_category2: "Adult",
			item_category3: "Shirts",
			item_category4: "Crew",
			item_category5: "Short sleeve",
			item_list_id: "related_products",
			item_list_name: "Related Products",
			item_variant: "green",
			location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
			price: 9.99,
			quantity: 1
		  }
		]
	  });
})
});

//------------------------------------view item list natively-------------------------------------
gtag("event", "view_item_list", {
	item_list_id: "related_products",
	item_list_name: "Related products",
	items: [
	  {
		item_id: "SKU_12345",
		item_name: "Stan and Friends Tee",
		affiliation: "Google Merchandise Store",
		coupon: "SUMMER_FUN",
		discount: 2.22,
		index: 0,
		item_brand: "Google",
		item_category: "Apparel",
		item_category2: "Adult",
		item_category3: "Shirts",
		item_category4: "Crew",
		item_category5: "Short sleeve",
		item_list_id: "related_products",
		item_list_name: "Related Products",
		item_variant: "green",
		location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
		price: 9.99,
		quantity: 1
	  }
	]
  });

//---------------------------------------------------------------------------------------------


