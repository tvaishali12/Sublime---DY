/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Search
4. Init Menu
5. Init Quantity



******************************/

var globalvar = "globalacess"
function globalAccess(){
	 globalvar = "a"
}
globalAccess();
console.log("global" , globalvar)


dataLayer.push({
	event :"global access",
	globalvar : "aa"
})
//------------------------------------------gtm---------------------------

document.querySelector("div.button.checkout_button").addEventListener('click',function(e){
    console.log("vaishali");
	dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "begin_checkout",
  ecommerce: {
    currency: "USD",
    value: 7.77,
    coupon: "SUMMER_FUN",
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
  }
});

})
//---------------------------------------------gtag----------------------------
document.querySelector("div.button.checkout_button").addEventListener('click',function(e){
	gtag("event", "begin_checkout", {
		currency: "USD",
		value: 7.77,
		coupon: "SUMMER_FUN",
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

document.querySelector("body > div > div.cart_info > div > div.row.row_cart_buttons > div > div > div.cart_buttons_right.ml-lg-auto > div.button.clear_cart_button > a").addEventListener("click",function(e){
	gtag("event", "remove_from_cart", {
		currency: "USD",
		value: 7.77,
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

//-----------------------------------------------------
$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	var hambActive = false;
	var menuActive = false;

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initSearch();
	initMenu();
	initQuantity();

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 100)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Search

	*/

	function initSearch()
	{
		if($('.search').length && $('.search_panel').length)
		{
			var search = $('.search');
			var panel = $('.search_panel');

			search.on('click', function()
			{
				panel.toggleClass('active');
			});
		}
	}

	/* 

	4. Init Menu

	*/

	function initMenu()
	{
		if($('.hamburger').length)
		{
			var hamb = $('.hamburger');

			hamb.on('click', function(event)
			{
				event.stopPropagation();

				if(!menuActive)
				{
					openMenu();
					
					$(document).one('click', function cls(e)
					{
						if($(e.target).hasClass('menu_mm'))
						{
							$(document).one('click', cls);
						}
						else
						{
							closeMenu();
						}
					});
				}
				else
				{
					$('.menu').removeClass('active');
					menuActive = false;
				}
			});

			//Handle page menu
			if($('.page_menu_item').length)
			{
				var items = $('.page_menu_item');
				items.each(function()
				{
					var item = $(this);

					item.on('click', function(evt)
					{
						if(item.hasClass('has-children'))
						{
							evt.preventDefault();
							evt.stopPropagation();
							var subItem = item.find('> ul');
						    if(subItem.hasClass('active'))
						    {
						    	subItem.toggleClass('active');
								TweenMax.to(subItem, 0.3, {height:0});
						    }
						    else
						    {
						    	subItem.toggleClass('active');
						    	TweenMax.set(subItem, {height:"auto"});
								TweenMax.from(subItem, 0.3, {height:0});
						    }
						}
						else
						{
							evt.stopPropagation();
						}
					});
				});
			}
		}
	}

	function openMenu()
	{
		var fs = $('.menu');
		fs.addClass('active');
		hambActive = true;
		menuActive = true;
	}

	function closeMenu()
	{
		var fs = $('.menu');
		fs.removeClass('active');
		hambActive = false;
		menuActive = false;
	}

	/* 

	5. Init Quantity

	*/

	function initQuantity()
	{
		// Handle product quantity input
		if($('.product_quantity').length)
		{
			var input = $('#quantity_input');
			var incButton = $('#quantity_inc_button');
			var decButton = $('#quantity_dec_button');

			var originalVal;
			var endVal;

			incButton.on('click', function()
			{
				originalVal = input.val();
				endVal = parseFloat(originalVal) + 1;
				input.val(endVal);
			});

			decButton.on('click', function()
			{
				originalVal = input.val();
				if(originalVal > 0)
				{
					endVal = parseFloat(originalVal) - 1;
					input.val(endVal);
				}
			});
		}
	}

});