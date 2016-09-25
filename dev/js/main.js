
var globalPageNameDataLayer = "";

var tipoDivPulsado = "";

var listDecos = [];
var listPasos = [];

var myResourceURL;
var myContextPathURL;

var ID_CIUDAD_SANANDRES = "88001000";

//variable para controlar el numero de planes de voz que se carga
var planVozNumber = 0;

//variable para contralar si cargamos un plan tv HD o no
var hasPlanTvHd = false;

//variables para poder controlar el caso especial planTvBasico
var divipolaSelectedTvBasico = "";
var estratoSelectedTvBasico = "";
var productoSelectedTvBasico = "";
var planVozSelectedTvBasico = "";
var planInternetSelectedTvBasico = "";
var planTvSelectedTvBasico = "";


//variables para controlar el caso especial de solo un planVoz
var divipolaSelectedVozSolo = "";
var estratoSelectedVozSolo = "";
var productoSelectedVozSolo = "";
var planVozSelectedVozSolo = "";

var moveElements={
	init: function() {
		$('#divSolicitud > div').each(function(index, el) {
			var labelName = $(this).find('label:first-child');
			var labelError = $(this).find('label.error');
			$(labelError).insertAfter(labelName);
		});
	}
}

var arrowButtons = {
	config: {
		arrowAtras: "#botonAtras",
		arrowSiguiente: "#botonSiguiente"
	},
	init: function(){
		$('<i class="icon-chevron-left">').insertAfter(arrowButtons.config.arrowAtras);
		$('<i class="icon-chevron-right">').insertAfter(arrowButtons.config.arrowSiguiente);
		// $(arrowButtons.config.arrowAtras).append('<i class="icon-chevron-left">');
		// $(arrowButtons.config.arrowSiguiente).append('<i class="icon-chevron-right">');
		if ($('#botonAtras').css('display', 'none')) {
			$('#botonSiguiente').css('float', 'right');
		} else{
			$('#botonSiguiente').css('float', 'left');
		};
	}
}

var showElements = {
	init :function() {
		var divsElements = new Array('#productos', '#planesVoz', '#planesTv', '#planesInternet', '#planesTvHd', '#planesTvDecos', '#planesMovGo');
		for (var i = 0; i < divsElements.length; i++) {

			if($(divsElements[i]).css('display') != "block"){
				$('#divPasos').css('border', '0px');
				$('div.buttonCustom > i').hide();
			}else{
				$('#divPasos').show();
				$('div.buttonCustom > i').show();
				$('#divCombos, #tabs').hide();
				return;
			}
		}
	}
}

var paddingMaker = {
	config:{
		container: 'div.cajaProducto'
	},
	init: function(){
		$(paddingMaker.config.container).each(function(index, el) {

			if($(this).find('div').length == 3){
				$(this).css('padding', '32px 0 0 5px');
			}
			else if($(this).find('div').length == 5) {
				$(this).css('padding', '15px 0 0 5px');
			} else{
				$(this).css('padding', '40px 0 0 5px');
			};
		});
	}
}

$(document).ready(function() {
	globalPageNameDataLayer = dataLayer_home();

	// init tabs, and disable the second tab
	$("#tabs").tabs({
		  disabled: [ 1 ]
	});

	myResourceURL = $("#resourceURL").val();
	myContextPathURL = $("#contextPathURL").val();

	initCotizacion();
	compararCotizaciones();

	showElements.init();
	paddingMaker.init();
	arrowButtons.init();

	$("#formSolicitud").submit(function(e) {
        e.preventDefault();
        var form = $("#formSolicitud");
        form.validate({
        	rules: {
        		nombre: "required",
        		apellidos: "required",
        		tipoDeDocumento: "required",
        		numeroDeDocumento: {
        			required: true,
        			number: true
        		},
        		direccion: "required",
        		barrio: "required",
        		email: {
   			    	required: true,
        			email: true
   			    },
   			    conf_email: {
   			    	required: true,
   			    	email: true,
   			    	equalTo: '#email'
   			    },
   			    telefono: {
   			    	number: true,
   			    	maxlength: 20,
   			    	required: {
   			    		depends: function () {
   			    			if($("#movil").val() != ""){
   			    				return false;
   			    			}else{
   			    				return true;
   			    			}
   			    		}
   			    	}
   			    },
		    	movil: {
   			    	number: true,
   			    	maxlength: 20,
   			    	required: {
   			    		depends: function () {
   			    			if($("#telefono").val() != ""){
   			    				return false;
   			    			}else{
   			    				return true;
   			    			}
   			    		}
   			    	}
   			    }
        	},
        	messages: {
        		nombre: '\u0043\u0061\u006d\u0070\u006f\u0020\u006f\u0062\u006c\u0069\u0067\u0061\u0074\u006f\u0072\u0069\u006f',
        		apellidos: '\u0043\u0061\u006d\u0070\u006f\u0020\u006f\u0062\u006c\u0069\u0067\u0061\u0074\u006f\u0072\u0069\u006f',
        		tipoDeDocumento: '\u0043\u0061\u006d\u0070\u006f\u0020\u006f\u0062\u006c\u0069\u0067\u0061\u0074\u006f\u0072\u0069\u006f',
        		numeroDeDocumento: {
        			required: '\u0043\u0061\u006d\u0070\u006f\u0020\u006f\u0062\u006c\u0069\u0067\u0061\u0074\u006f\u0072\u0069\u006f',
        			number: '\u0044\u0065\u0062\u0065\u0020\u0069\u006e\u0074\u0072\u006f\u0064\u0075\u0063\u0069\u0072\u0020\u0075\u006e\u0020\u0076\u0061\u006c\u006f\u0072\u0020\u006e\u0075\u006d\u00e9\u0072\u0069\u0063\u006f'
        		},
        		direccion: '\u0043\u0061\u006d\u0070\u006f\u0020\u006f\u0062\u006c\u0069\u0067\u0061\u0074\u006f\u0072\u0069\u006f',
        		barrio: '\u0043\u0061\u006d\u0070\u006f\u0020\u006f\u0062\u006c\u0069\u0067\u0061\u0074\u006f\u0072\u0069\u006f',
        		email: {
        			required: '\u0043\u0061\u006d\u0070\u006f\u0020\u006f\u0062\u006c\u0069\u0067\u0061\u0074\u006f\u0072\u0069\u006f',
        			email: '\u0045\u006d\u0061\u0069\u006c\u0020\u006e\u006f\u0020\u0076\u00e1\u006c\u0069\u0064\u006f'
        		},
        		telefono: {
        			required: '\u0049\u006e\u0074\u0072\u006f\u0064\u0075\u007a\u0063\u0061\u0020\u0075\u006e\u0020\u006e\u00fa\u006d\u0065\u0072\u006f\u0020\u0064\u0065\u0020\u0074\u0065\u006c\u00e9\u0066\u006f\u006e\u006f',
        			number: '\u0044\u0065\u0062\u0065\u0020\u0069\u006e\u0074\u0072\u006f\u0064\u0075\u0063\u0069\u0072\u0020\u0075\u006e\u0020\u0076\u0061\u006c\u006f\u0072\u0020\u006e\u0075\u006d\u00e9\u0072\u0069\u0063\u006f',
        			maxlength: '\u0053\u006f\u006c\u006f\u0020\u0070\u0075\u0065\u0064\u0065\u0073\u0020\u0069\u006e\u0074\u0072\u006f\u0064\u0075\u0063\u0069\u0072\u0020\u0032\u0030\u0020\u006e\u0075\u006d\u0065\u0072\u006f\u0073'
        		},
        		movil: {
        			required: '\u0049\u006e\u0074\u0072\u006f\u0064\u0075\u007a\u0063\u0061\u0020\u0075\u006e\u0020\u006e\u00fa\u006d\u0065\u0072\u006f\u0020\u0064\u0065\u0020\u0063\u0065\u006c\u0075\u006c\u0061\u0072',
        			number: '\u0044\u0065\u0062\u0065\u0020\u0069\u006e\u0074\u0072\u006f\u0064\u0075\u0063\u0069\u0072\u0020\u0075\u006e\u0020\u0076\u0061\u006c\u006f\u0072\u0020\u006e\u0075\u006d\u00e9\u0072\u0069\u0063\u006f',
        			maxlength: '\u0053\u006f\u006c\u006f\u0020\u0070\u0075\u0065\u0064\u0065\u0073\u0020\u0069\u006e\u0074\u0072\u006f\u0064\u0075\u0063\u0069\u0072\u0020\u0032\u0030\u0020\u006e\u0075\u006d\u0065\u0072\u006f\u0073'
        		},
        		conf_email: {
        			required: '\u0043\u0061\u006d\u0070\u006f\u0020\u006f\u0062\u006c\u0069\u0067\u0061\u0074\u006f\u0072\u0069\u006f',
        			email: '\u0045\u006d\u0061\u0069\u006c\u0020\u006e\u006f\u0020\u0076\u00e1\u006c\u0069\u0064\u006f',
        			equalTo: '\u0045\u006c\u0020\u0076\u0061\u006c\u006f\u0072\u0020\u0069\u006e\u0074\u0072\u006f\u0064\u0075\u0063\u0069\u0064\u006f\u0020\u006e\u006f\u0020\u0063\u006f\u0069\u006e\u0063\u0069\u0064\u0065'
        		}
        	}
        });
        if (form.valid()) {
        	enviarCotizacion();
        	dataLayer_formularioCotizadorEnviado( globalPageNameDataLayer );
        } else {
        	moveElements.init();
        }
    });
});

function seteaPaso(divIdSiguiente) {
	if ('' != divIdSiguiente) {
		var index = listPasos.indexOf( divIdSiguiente );
		if (index >= 0) {
			//eliminar si existe
			listPasos.splice(index, 1);
		}
		else if (index == -1) {
			//agregar al final de la lista
			listPasos.push( divIdSiguiente );
		}
	} else {
		listPasos = [];
	}
}
function siguientePaso(adelante) {
	var idDivAMostrar = "";
	if (adelante) {

		//caso especial para solo un plan de voz
		if(planVozNumber == 1){
			pasoSigPlanVozSpecial(adelante);
		}
		//caso especial cuando estamos en planTvHd
		if($("#breadcrumb_planesTvHd").hasClass("active")){
			//console.log("#breadcrumb_planesTvHd es ACTIVOOOOOOO");
			pasoSigPlanTvBasico(adelante);
		}
		if (listPasos.length > 0) {
			idDivAMostrar = listPasos[listPasos.length-1];
		}
	} else {
		idDivAMostrar = obtenAtrasPaso();
			if (listPasos.length > 0) {
				listPasos.splice(listPasos.length-1, 1);	// borramos último paso
			}
			tipoDivPulsado = "";
		}
	if ('planesTvDecos' != idDivAMostrar) {
		borramosCarrito();
	}
	//console.log('breadcrumbs -----> '+listPasos);
	initDivs(idDivAMostrar);
}
function obtenAtrasPaso() {
	var idDivAtras = "";
	if (listPasos.length > 1) {
		idDivAtras = listPasos[listPasos.length-2];
		//caso especial no saltamos el paso cuando solo hay un plan de voz
		//console.log("ID DIV ATRAS :" + idDivAtras);
		if(idDivAtras=='planesVoz' && planVozNumber==1){
			idDivAtras = listPasos[0];
		}
	}
	return idDivAtras;
}

function initCombos(totalCombos) {
	if (totalCombos == 3) {
		$("#deptos").html("<option value='-1'>"+'\u0044\u0065\u0070\u0061\u0072\u0074\u0061\u006d\u0065\u006e\u0074\u006f'+"</option>");
		$("#deptos").attr("disabled", "disabled");
		$("#ciudades").html("<option value='-1'>"+'\u0043\u0069\u0075\u0064\u0061\u0064'+"</option>");
		$("#ciudades").attr("disabled", "disabled");
		$("#estratos").html("<option value='-1'>"+'\u0045\u0073\u0074\u0072\u0061\u0074\u006f'+"</option>");
		$("#estratos").attr("disabled", "disabled");
	} else if (totalCombos == 2) {
		$("#ciudades").html("<option value='-1'>"+'\u0043\u0069\u0075\u0064\u0061\u0064'+"</option>");
		$("#ciudades").attr("disabled", "disabled");
		$("#estratos").html("<option value='-1'>"+'\u0045\u0073\u0074\u0072\u0061\u0074\u006f'+"</option>");
		$("#estratos").attr("disabled", "disabled");
	} else if (totalCombos == 1) {
		$("#estratos").html("<option value='-1'>"+'\u0045\u0073\u0074\u0072\u0061\u0074\u006f'+"</option>");
		$("#estratos").attr("disabled", "disabled");
	}
}

function initDivs(idDivAMostrar) {
	if ("" == idDivAMostrar) {
		tipoDivPulsado = "";

		$("#breadcrumb_productos").hide();
		$("#breadcrumb_planesVoz").hide();
		$("#breadcrumb_planesInternet").hide();
		$("#breadcrumb_planesTv").hide();
		$("#breadcrumb_planesTvHd").hide();
		$("#breadcrumb_planesTvDecos").hide();

		$("#tabs").hide();

		$("#botonAtras").hide();
		$("#botonSiguiente").hide();

		$("#productos").hide();
		$("#productos").empty();

		$("#planesVoz").hide();
		$("#planesVoz").empty();

		$("#planesInternet").hide();
		$("#planesInternet").empty();

		$("#planesTv").hide();
		$("#planesTv").empty();

		$("#planesTvHd").hide();
		$("#planesTvHd").empty();

		listDecos = [];
		$("#planesTvDecos").hide();
		$("#planesTvDecos").empty();

		$("#planesMovGo").hide();
		$("#planesMovGo").empty();

		// obtenemos la pestana seleccionada, y borramos su contenido
		var idDivCotizacionSeleccionada = obtenCotizacionSeleccionada();
		if ("cotizacion1" == idDivCotizacionSeleccionada) {
			$("#cotizacion1").empty();
			$("#cotizacion2").empty();
			$("#botonEnviarSolicitud1").hide();
			$("#botonEnviarSolicitud2").hide();
			$("#botonAmpliarCotizaciones").hide();
			$("#botonCotizacion2").hide();
		} else {
			$("#cotizacion2").empty();
			$("#botonEnviarSolicitud2").hide();
			$("#botonAmpliarCotizaciones").hide();
			$("#botonCotizacion2").hide();
		}
	} else {
		$("#botonAtras").show();
		$("#botonSiguiente").show();

		$("#breadcrumb_productos").show();
		$("#breadcrumb_planesVoz").show();
		$("#breadcrumb_planesInternet").show();
		$("#breadcrumb_planesTv").show();
		$("#breadcrumb_planesTvHd").show();
		$("#breadcrumb_planesTvDecos").show();

		if ('productos' == idDivAMostrar) {
			$("#productos").show();
			showElements.init();
			paddingMaker.init();
			// quitamos chequeados
			$("input[name='producto']").each(function() {
				$(this).attr('checked', false);
				$(this).parent().removeClass('darkBox');
			});
			$('#tipomx-movvideo').attr('checked', false);
			$('#tipomx-movvideo').parent().removeClass('darkBox');
			$("#botonAtras").hide();
			// breadcrumb active
			$("#breadcrumb_productos").addClass("active");
			$(".miga ul li:first-of-type").addClass("active");
			$(".containerProgreso").hide();

		} else {
			$("#productos").hide();
			showElements.init();
			// breadcrumb NOT active
			$("#breadcrumb_productos").removeClass("active");
			$(".miga ul li:first-of-type").removeClass("active");
		}

		if ('planesVoz' == idDivAMostrar) {
			$("#planesVoz").show();
			showElements.init();
			// quitamos chequeados
			$("input[name='planLB']").each(function() {
				$(this).attr('checked', false);
				if(planVozNumber != 1){
					$(this).parent().removeClass('darkBox');
				}else{
					$(this).attr('checked', true);
					$(this).parent().addClass('darkBox');
					$(".containerProgreso").show();
				}
			});
			// breadcrumb active
			$("#breadcrumb_planesVoz").addClass("active");
			$(".miga ul li:nth-child(2)").addClass("active");
		} else {
			$("#planesVoz").hide();
			// breadcrumb NOT active
			$("#breadcrumb_planesVoz").removeClass("active");
			$(".miga ul li:nth-child(2)").removeClass("active");
		}

		if ('planesInternet' == idDivAMostrar) {
			$("#planesInternet").show();
			showElements.init();
			// quitamos chequeados
			$("input[name='planBA']").each(function() {
				$(this).attr('checked', false);
				$(this).parent().removeClass('darkBox');
			});
			// breadcrumb active
			$("#breadcrumb_planesInternet").addClass("active");
			$(".miga ul li:nth-child(3)").addClass("active");
		} else {
			$("#planesInternet").hide();
			// breadcrumb NOT active
			$("#breadcrumb_planesInternet").removeClass("active");
			$(".miga ul li:nth-child(3)").removeClass("active");
		}

		if ('planesTv' == idDivAMostrar) {
			$("#planesTv").show();
			showElements.init();
			// quitamos chequeados
			$("input[name='planTV']").each(function() {
				$(this).attr('checked', false);
				$(this).parent().removeClass('darkBox');
			});
			// breadcrumb active
			$("#breadcrumb_planesTv").addClass("active");
			$(".miga ul li:nth-child(4)").addClass("active");
		} else {
			$("#planesTv").hide();
			// breadcrumb NOT active
			$("#breadcrumb_planesTv").removeClass("active");
			$(".miga ul li:nth-child(4)").removeClass("active");
		}

		if ('planesTvHd' == idDivAMostrar) {
			$("#planesTvHd").show();
			showElements.init();
			// quitamos chequeados
			$("input[name='planTVHD']").each(function() {
				$(this).attr('checked', false);
				$(this).parent().removeClass('darkBox');
			});
			//activamos el checked para el caso de planTvBasico
			$("input[id='planTvBasico']").prop('checked', true).attr("checked", true);
			// breadcrumb active
			$("#breadcrumb_planesTvHd").addClass("active");
			$(".miga ul li:nth-child(5)").addClass("active");
			$("tabs").hide();
		} else {
			$("#planesTvHd").hide();
			// breadcrumb NOT active
			$("#breadcrumb_planesTvHd").removeClass("active");
			$(".miga ul li:nth-child(5)").removeClass("active");
		}

		if ('planesTvDecos' == idDivAMostrar) {
			$("#planesTvDecos").show();
			listDecos = [];
			showElements.init();
			$("#botonSiguiente").hide();
			// breadcrumb active
			$("#breadcrumb_planesTvDecos").addClass("active");
			$(".miga ul li:nth-child(6)").addClass("active");
		} else {
			$("#planesTvDecos").hide();
			// breadcrumb NOT active
			$("#breadcrumb_planesTvDecos").removeClass("active");
			$(".miga ul li:nth-child(6)").removeClass("active");
		}

		if ('planesMovGo' == idDivAMostrar) {
			$("#planesMovGo").show();
			showElements.init();
			// quitamos chequeados
			$("input[name='planesMovGo']").each(function() {
				$(this).attr('checked', false);
				$(this).parent().removeClass('darkBox');
			});
		} else {
			$("#planesMovGo").hide();
		}
	}
}

function loadDeparts() {
	jQuery.ajax({
		type : "post",
		url : myResourceURL,
		dataType : 'json',
		data : {
			'accion' : 'loadDeparts'
		},
		success : function(data) {
			var myOption = "<option value='-1'>"+'\u0044\u0065\u0070\u0061\u0072\u0074\u0061\u006d\u0065\u006e\u0074\u006f'+"</option>";
			for (k=0; k<data.length; k++) {
				myOption += "<option value='"+data[k].departKey+"'>"+data[k].departValue+"</option>";
			}
			$("#deptos").html( myOption );
			$("#deptos").removeAttr("disabled");
		}
	});
}

jQuery(function() {

	jQuery("#deptos").change(function() {
		var deptoSelected = jQuery(this).val();
		if (deptoSelected != "-1") {
			initCombos(2);
			seteaPaso('');
			siguientePaso(true);
			showElements.init();
			jQuery.ajax({
				type : "post",
				url : myResourceURL,
				dataType : 'json',
				data : {
					'accion' : 'loadCities',
					'departamento' : deptoSelected
				},
				success : function(data) {
					var myOption = "<option value='-1'>"+'\u0043\u0069\u0075\u0064\u0061\u0064'+"</option>";
					for (k=0; k<data.length; k++) {
						myOption += "<option value='"+data[k].cityKey+"'>"+data[k].cityValue+"</option>";
					}
					$("#ciudades").html( myOption );
					$("#ciudades").removeAttr("disabled");
				}
			});
		} else {
			initCombos(2);
			seteaPaso('');
			siguientePaso(true);
		}
	});

	jQuery("#ciudades").change(function() {
		var divipolaSelected = jQuery(this).val();
		if (divipolaSelected != "-1") {
			initCombos(1);
			seteaPaso('');
			siguientePaso(true);
			showElements.init();
			jQuery.ajax({
				type : "post",
				url : myResourceURL,
				dataType : 'json',
				data : {
					'accion' : 'loadEstratos',
					'ciudad' : divipolaSelected
				},
				success : function(data) {
					var myOption = "<option value='-1'>"+'\u0045\u0073\u0074\u0072\u0061\u0074\u006f'+"</option>";
					for (k=0; k<data.length; k++) {
						myOption += "<option value='"+data[k].estratoKey+"'>"+data[k].estratoValue+"</option>";
					}
					$("#estratos").html( myOption );
					$("#estratos").removeAttr("disabled");
				}
			});
		} else {
			initCombos(1);
			seteaPaso('');
			siguientePaso(true);
		}
	});

	jQuery("#estratos").change(function() {
		var divipolaSelected = jQuery('#ciudades').val();
		var estratoSelected = jQuery(this).val();
		if (estratoSelected != "-1") {
			seteaPaso('');
			siguientePaso(true);
			showElements.init();
			dataLayer_botonAceptar( jQuery('#deptos option:selected').text(), jQuery('#ciudades option:selected').text(), estratoSelected );
			jQuery.ajax({
				type : "post",
				url : myResourceURL,
				dataType : 'json',
				data : {
					'accion' : 'loadProducts',
					'ciudad' : divipolaSelected,
					'estrato' : estratoSelected
				},
				success : function(data) {
					$("#tabs").show();
					$("#productos").empty();
					var myOption = "<h4 class='subTitProductos'>"+'\u0053\u0065\u006c\u0065\u0063\u0063\u0069\u006f\u006e\u0061\u0020\u006c\u006f\u0073\u0020\u0070\u0072\u006f\u0064\u0075\u0063\u0074\u006f\u0073\u0020\u0071\u0075\u0065\u0020\u0064\u0065\u0073\u0065\u0061\u0073\u0020\u0061\u0064\u0071\u0075\u0069\u0072\u0069\u0072'+"</h4>";
					for (k=0; k<data.length; k++) {
						myOption += "<div class='span6 xs-span-12'>";
						myOption += "<div class='cajaProducto span12 '>";
						myOption +=	   "<input type='radio' name='producto' value='"+data[k].producto+"' />";
						switch (data[k].producto) {
							case '\u0044\u0055\u004f\u0020\u0054\u0056':
								myOption += "<div class='homephoneFija'>"+'\u0054\u0065\u006c\u0065\u0066\u006f\u006e\u0026\u0069\u0061\u0063\u0075\u0074\u0065\u003b\u0061\u0020\u0046\u0069\u006a\u0061'+"</div>";
								myOption += "<div>+</div>";
								myOption += "<div class='homephoneTv'>"+'\u0054\u0065\u006c\u0065\u0076\u0069\u0073\u0069\u0026\u006f\u0061\u0063\u0075\u0074\u0065\u003b\u006e'+"</div>";
								break;
							case '\u0044\u0055\u004f\u0020\u0042\u0041':
								myOption += "<div class='homephoneFija'>"+'\u0054\u0065\u006c\u0065\u0066\u006f\u006e\u0026\u0069\u0061\u0063\u0075\u0074\u0065\u003b\u0061\u0020\u0046\u0069\u006a\u0061'+"</div>";
								myOption += "<div>+</div>";
								myOption += "<div class='homephoneInternet'>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074'+"</div>";
								break;
							case '\u0054\u0052\u0049\u004f':
								myOption += "<div class='homephoneFija'>"+'\u0054\u0065\u006c\u0065\u0066\u006f\u006e\u0026\u0069\u0061\u0063\u0075\u0074\u0065\u003b\u0061\u0020\u0046\u0069\u006a\u0061'+"</div>";
								myOption += "<div>+</div>";
								myOption += "<div class='homephoneInternet'>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074'+"</div>";
								myOption += "<div>+</div>";
								myOption += "<div class='homephoneTv'>"+'\u0054\u0065\u006c\u0065\u0076\u0069\u0073\u0069\u0026\u006f\u0061\u0063\u0075\u0074\u0065\u003b\u006e'+"</div>";
								break;
							case '\u0054\u0056\u0020\u0053\u004f\u004c\u0041':
								myOption += "<div class='homephoneTv'>"+'\u0054\u0065\u006c\u0065\u0076\u0069\u0073\u0069\u0026\u006f\u0061\u0063\u0075\u0074\u0065\u003b\u006e'+"</div>";
								break;
							case '\u004c\u0042\u0020\u0053\u004f\u004c\u0041':
								myOption += "<div class='homephoneFija'>"+'\u0054\u0065\u006c\u0065\u0066\u006f\u006e\u0026\u0069\u0061\u0063\u0075\u0074\u0065\u003b\u0061\u0020\u0046\u0069\u006a\u0061'+"</div>";
								break;
							case '\u004d\u004f\u0056\u0049\u0053\u0054\u0041\u0052\u0020\u0047\u004f':
								myOption += "<label>"+'\u004d\u006f\u0076\u0069\u0073\u0074\u0061\u0072\u0020\u0047\u004f'+"</label>";
								break;
						}
						myOption += "</div>";
						myOption += "</div>";
					}

					myOption += "<div class='span6 xs-span-12'>";
					myOption += 	"<div class='cajaProducto_movVideo span12'>";
					myOption +=			"<input id='tipomx-movvideo' type='checkbox' value='"+'\u004d\u004f\u0056\u0049\u0053\u0054\u0041\u0052\u0020\u0056\u0049\u0044\u0045\u004f'+"' />";
					myOption +=			"<label>"+'\u004d\u006f\u0076\u0069\u0073\u0074\u0061\u0072\u0020\u0050\u006c\u0061\u0079'+"</label>";
					myOption += 	"</div>";
					myOption += "</div>";
					$("#productos").append( myOption );
					seteaPaso('productos');
					siguientePaso(true);

					jQuery('div.cajaProducto_movVideo').click(function() {
						var movVideoChecked = $("#tipomx-movvideo:checked").length;
						if (movVideoChecked == 1) {
							$(this).children("input:checkbox").prop("checked", false);
						} else {
							$(this).children("input:checkbox").prop("checked", true);
						}
						movVideoChecked = $("#tipomx-movvideo:checked").length;
						if (movVideoChecked == 1) {
							displayValue( divipolaSelected, estratoSelected, '', '', '', '', '', new Array(), '' );
							$(this).addClass('darkBox');
						} else {
							borramosCarrito();
							$("#botonSiguiente").show();
							$(this).removeClass('darkBox');
						}
					});
					jQuery('div.cajaProducto').click(function() {
						//al hacer click monstramos la capa de bloqueo
						blockScreen.show();
						if (tipoDivPulsado == $(this).children(":first").attr("name")) {
							// si ya habíamos seleccionado antes otro DIV "hermano", nos cargamos el paso. Para que cuando demos al botón Siguiente, la "listPasos" (breadcrums) sea la correcta
							siguientePaso(false);
						}

						tipoDivPulsado = $(this).children(":first").attr("name");

						$(this).children("input:radio").prop('checked', true).attr("checked", true);
						if($(this).children("input:radio").is(':checked')){
							$('div.cajaProducto').removeClass('darkBox');
							$(this).addClass('darkBox');
						}else{
							$(this).removeClass('darkBox');
						}

						// al pinchar sobre la caja (div), simula un click sobre el radioButton (siempre que este sea el primer hijo)
						selectPlan(divipolaSelected, estratoSelected, $(this).children(":first").val());
					});
				}
			});

		} else {
			seteaPaso('');
			siguientePaso(true);
		}
	});

});

function selectPlan(divipolaSelected, estratoSelected, productoSelected) {
	globalPageNameDataLayer = dataLayer_seleccionaProducto( productoSelected );

	if (productoSelected == '\u0054\u0056\u0020\u0053\u004f\u004c\u0041') {

		// tv solo
		loadPlanTv(divipolaSelected, estratoSelected, productoSelected, '', '');

	} else if (productoSelected == '\u004d\u004f\u0056\u0049\u0053\u0054\u0041\u0052\u0020\u0047\u004f') {

		// movgo solo
		loadPlanMovgo(divipolaSelected, estratoSelected, productoSelected);

	} else {

		// voz
		loadPlanVoz(divipolaSelected, estratoSelected, productoSelected);

	}
}

function loadPlanMovgo(divipolaSelected, estratoSelected, productoSelected) {
	//console.log("loadPlanMovgo( "+divipolaSelected+", "+estratoSelected+", "+productoSelected+" )");

	jQuery.ajax({
		type : "post",
		url : myResourceURL,
		dataType : 'json',
		data : {
			'accion' : 'loadPlans_MovGo',
			'ciudad' : divipolaSelected,
			'estrato' : estratoSelected,
			'producto' : productoSelected
		},
		success : function(data) {
			$("#planesMovGo").empty();
			var myOption = "";
			for (k=0; k<data.length; k++) {
				myOption = "<div class='cajaPlanesMovGo'>"
								+"<input type='radio' name='planMovGo' value='"+data[k].plan+"' />"
								+"<span>"+'\u004d\u006f\u0076\u0069\u0073\u0074\u0061\u0072\u0020\u0047\u004f'+"</span>"
								+"<span>"+'\u004d\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u0073\u0020\u0064\u0065\u0020\u0031\u0030\u0030\u0030\u0020\u0063\u006f\u006e\u0074\u0065\u006e\u0069\u0064\u006f\u0073'+"</span>"
							+"</div>";
			}
			$("#planesMovGo").append( myOption );
			seteaPaso('planesMovGo');

			jQuery('div.cajaPlanesMovGo').click(function() {
				if (tipoDivPulsado == $(this).children(":first").attr("name")) {
					// si ya habíamos seleccionado antes otro DIV "hermano", nos cargamos el paso. Para que cuando demos al botón Siguiente, la "listPasos" (breadcrums) sea la correcta
					siguientePaso(false);
				}
				tipoDivPulsado = $(this).children(":first").attr("name");

				$(this).children("input:radio").prop('checked', true).attr("checked", true);
				if($(this).children("input:radio").is(':checked')){
					$('div.cajaPlanesMovGo').removeClass('darkBox');
					$(this).addClass('darkBox');
				}else{
					$(this).removeClass('darkBox');
				}

				// al pinchar sobre la caja (div), simula un click sobre el radioButton (siempre que este sea el primer hijo)
				displayValue( divipolaSelected, estratoSelected, productoSelected, '', '', '', '', new Array(), $(this).children(":first").val() );
			});
		}
	});
}

function loadPlanVoz(divipolaSelected, estratoSelected, productoSelected) {
	//console.log("loadPlanVoz( "+divipolaSelected+", "+estratoSelected+", "+productoSelected+" )");

	jQuery.ajax({
		type : "post",
		url : myResourceURL,
		dataType : 'json',
		data : {
			'accion' : 'loadPlans_LB',
			'ciudad' : divipolaSelected,
			'estrato' : estratoSelected,
			'producto' : productoSelected
		},
		success : function(data) {
			$("#planesVoz").empty();
			var myOption = "<h4 class='subTitProductos'>"+'\u0045\u0073\u0063\u006f\u0067\u0065\u0020\u0074\u0075\u0020\u0070\u006c\u0061\u006e\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0064\u0065\u0020\u0076\u006f\u007a'+"</h4>";
			for (k=0; k<data.length; k++) {
				myOption += "<div class='span6 xxs-span-12 xs-span-6'>";
				myOption += 	"<div class='cajaPlanesVoz'>";
				myOption +=	   		"<input type='radio' name='planLB' value='"+data[k].plan+"' />";
				switch (data[k].plan) {
					case '\u0056\u006f\u007a\u0020\u004c\u006f\u0063\u0061\u006c':
						myOption += "<span>"+'\u0054\u0065\u006c\u0065\u0066\u006f\u006e\u00ed\u0061\u0020\u0046\u0069\u006a\u0061\u0020\u002d\u0020\u004c\u006f\u0063\u0061\u006c'+"</span>";
						myOption += "<p>"+'\u0052\u0065\u0061\u006c\u0069\u007a\u0061\u0020\u006c\u006c\u0061\u006d\u0061\u0064\u0061\u0073\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u0061\u0073\u0020\u0061\u0020\u006e\u0026\u0075\u0061\u0063\u0075\u0074\u0065\u003b\u006d\u0065\u0072\u006f\u0073\u0020\u006c\u006f\u0063\u0061\u006c\u0065\u0073'+"</p>";
						break;
					case '\u0056\u006f\u007a\u0020\u004e\u0061\u0063\u0069\u006f\u006e\u0061\u006c':
						myOption += "<span>"+'\u0054\u0065\u006c\u0065\u0066\u006f\u006e\u00ed\u0061\u0020\u0046\u0069\u006a\u0061\u0020\u002d\u0020\u004e\u0061\u0063\u0069\u006f\u006e\u0061\u006c'+"</span>";
						myOption += "<p>"+'\u004c\u006c\u0061\u006d\u0061\u0064\u0061\u0073\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u0061\u0073\u0020\u0061\u0020\u0063\u0075\u0061\u006c\u0071\u0075\u0069\u0065\u0072\u0020\u006f\u0070\u0065\u0072\u0061\u0064\u006f\u0072\u0020\u0066\u0069\u006a\u006f\u002e\u0049\u006e\u0063\u006c\u0075\u0079\u0065\u0020\u0074\u006f\u0074\u0061\u006c\u006d\u0065\u006e\u0074\u0065\u0020\u0067\u0072\u0061\u0074\u0069\u0073\u0020\u0065\u006c\u0020\u0073\u0065\u0072\u0076\u0069\u0063\u0069\u006f\u0020\u0050\u0072\u0065\u0066\u0065\u0072\u0069\u0064\u006f\u0020\u0046\u0069\u006a\u006f\u002b\u004d\u00f3\u0076\u0069\u006c'+"</p>";
						break;
				}
				myOption += 	"</div>";
				myOption += "</div>";
			}
			$("#planesVoz").append( myOption );

			//recuperamos el numero de planes de voz
			planVozNumber = $("div.cajaPlanesVoz").length;

			if(planVozNumber != null){
				//si tenemos solo un plan de voz nos saltamos la pantalla de seleccion de "Telefonia"
				if(planVozNumber == 1){
						if (tipoDivPulsado == $('div.cajaPlanesVoz').children(":first").attr("name")) {
							// si ya habíamos seleccionado antes otro DIV "hermano", nos cargamos el paso. Para que cuando demos al botón Siguiente, la "listPasos" (breadcrums) sea la correcta
							siguientePaso(false);
						}
						seteaPaso('planesVoz');
						tipoDivPulsado = $('div.cajaPlanesVoz').children(":first").attr("name");

						divipolaSelectedVozSolo = divipolaSelected;
						estratoSelectedVozSolo = estratoSelected;
						productoSelectedVozSolo = productoSelected;
						planVozSelectedVozSolo = $('div.cajaPlanesVoz').children(":first").val();
				}else{
					seteaPaso('planesVoz');
					jQuery('div.cajaPlanesVoz').click(function() {

						//al hacer click monstramos la capa de bloqueo
						blockScreen.show();

						if (tipoDivPulsado == $(this).children(":first").attr("name")) {
							// si ya habíamos seleccionado antes otro DIV "hermano", nos cargamos el paso. Para que cuando demos al botón Siguiente, la "listPasos" (breadcrums) sea la correcta
							siguientePaso(false);
						}
						tipoDivPulsado = $(this).children(":first").attr("name");

						$(this).children("input:radio").prop('checked', true).attr("checked", true);
						if($(this).children("input:radio").is(':checked')){
							$('div.cajaPlanesVoz').removeClass('darkBox');
							$(this).addClass('darkBox');
						}else{
							$(this).removeClass('darkBox');
						}

						// al pinchar sobre la caja (div), simula un click sobre el radioButton (siempre que este sea el primer hijo)
						selectPlanVoz(divipolaSelected, estratoSelected, productoSelected, $(this).children(":first").val());
					});
				}
			}
		},
		complete: function (){
			//console.log("COMPLETE LOAD PLAN VOZ ");
			blockScreen.hide();
		}
	});
}

function selectPlanVoz(divipolaSelected, estratoSelected, productoSelected, planVozSelected) {
	globalPageNameDataLayer = dataLayer_seleccionaVoz( globalPageNameDataLayer, planVozSelected );

	if (productoSelected == '\u004c\u0042\u0020\u0053\u004f\u004c\u0041') {

		// voz solo
		displayValue( divipolaSelected, estratoSelected, productoSelected, planVozSelected, '', '', '', new Array(), '' );

	} else if (productoSelected == '\u0044\u0055\u004f\u0020\u0054\u0056') {

		// voz + tv
		loadPlanTv(divipolaSelected, estratoSelected, productoSelected, planVozSelected, '');

	} else if (productoSelected == '\u0044\u0055\u004f\u0020\u0042\u0041') {

		// voz + internet
		loadPlanInternet( divipolaSelected, estratoSelected, productoSelected, planVozSelected );

	} else if (productoSelected == '\u0054\u0052\u0049\u004f') {

		// voz + internet + tv
		loadPlanInternet( divipolaSelected, estratoSelected, productoSelected, planVozSelected );

	}
}

function loadPlanInternet(divipolaSelected, estratoSelected, productoSelected, planVozSelected) {
	//console.log("loadPlanInternet( "+divipolaSelected+", "+estratoSelected+", "+productoSelected+", "+planVozSelected+" )");

	jQuery.ajax({
		type : "post",
		url : myResourceURL,
		dataType : 'json',
		data : {
			'accion' : 'loadPlans_BA',
			'ciudad' : divipolaSelected,
			'estrato' : estratoSelected,
			'producto' : productoSelected,
			'planLB' : planVozSelected
		},
		success : function(data) {
			$("#planesInternet").empty();
		var myOption = "<h4 class='subTitProductos'>"+'\u0045\u0073\u0063\u006f\u0067\u0065\u0020\u0074\u0075\u0020\u0070\u006c\u0061\u006e\u0020\u0064\u0065\u0020\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074'+"</h4>";
			for (k=0; k<data.length; k++) {
				myOption += "<div class='span6 xs-span-12'>";
				myOption += 	"<div class='cajaPlanesInternet'>";
				myOption +=	   		"<input type='radio' name='planBA' value='"+data[k].plan+"' />";
				//console.log("Plan INTERNET: " + data[k].plan);
				switch (data[k].plan) {
					case '\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0052\u0065\u0073\u0069\u0064\u0065\u006e\u0063\u0069\u0061\u006c\u0020\u0053\u0061\u0074\u0065\u006c\u0069\u0074\u0061\u006c\u0020\u0032\u0030\u0030\u004b':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0032\u0030\u0030\u0020\u004b'+"</span>";
						myOption += "<p>"+'\u004e\u0061\u0076\u0065\u0067\u0061\u0020\u0065\u006e\u0020\u0069\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u002e'+"</p>";
						break;
					case '\u0031\u0020\u004d\u0062\u0070\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0031\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0075\u0020\u0068\u006f\u0067\u0061\u0072\u002c\u0020\u0063\u0068\u0061\u0074\u0065\u0061\u002c\u0020\u0063\u006f\u006e\u0073\u0075\u006c\u0074\u0061\u0020\u0074\u0075\u0020\u006d\u0061\u0069\u006c\u0020\u0079\u0020\u006e\u0061\u0076\u0065\u0067\u0061\u0020\u0073\u0069\u006e\u0020\u006c\u0026\u0069\u0061\u0063\u0075\u0074\u0065\u003b\u006d\u0069\u0074\u0065\u0073\u002e'+"</p>";
						break;
					case '\u0031\u0020\u004d\u0065\u0067\u0061':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0031\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0075\u0020\u0068\u006f\u0067\u0061\u0072\u002c\u0020\u0063\u0068\u0061\u0074\u0065\u0061\u002c\u0020\u0063\u006f\u006e\u0073\u0075\u006c\u0074\u0061\u0020\u0074\u0075\u0020\u006d\u0061\u0069\u006c\u0020\u0079\u0020\u006e\u0061\u0076\u0065\u0067\u0061\u0020\u0073\u0069\u006e\u0020\u006c\u0026\u0069\u0061\u0063\u0075\u0074\u0065\u003b\u006d\u0069\u0074\u0065\u0073\u002e'+"</p>";
						break;
					case '\u0032\u0020\u004d\u0062\u0070\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0032\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0075\u0020\u0068\u006f\u0067\u0061\u0072\u002c\u0020\u0063\u0068\u0061\u0074\u0065\u0061\u002c\u0020\u006e\u0061\u0076\u0065\u0067\u0061\u002c\u0020\u0063\u006f\u006e\u0073\u0075\u006c\u0074\u0061\u0020\u0074\u0075\u0073\u0020\u0072\u0065\u0064\u0065\u0073\u0020\u0073\u006f\u0063\u0069\u0061\u006c\u0065\u0073\u002e\u0020\u0043\u006f\u006e\u0065\u0063\u0074\u0061\u0020\u006f\u0074\u0072\u006f\u0020\u0065\u0071\u0075\u0069\u0070\u006f\u0020\u0061\u0064\u0069\u0063\u0069\u006f\u006e\u0061\u006c\u002e'+"</p>";
						break;
					case '\u0032\u0020\u004d\u0065\u0067\u0061\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0032\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0075\u0020\u0068\u006f\u0067\u0061\u0072\u002c\u0020\u0063\u0068\u0061\u0074\u0065\u0061\u002c\u0020\u006e\u0061\u0076\u0065\u0067\u0061\u002c\u0020\u0063\u006f\u006e\u0073\u0075\u006c\u0074\u0061\u0020\u0074\u0075\u0073\u0020\u0072\u0065\u0064\u0065\u0073\u0020\u0073\u006f\u0063\u0069\u0061\u006c\u0065\u0073\u002e\u0020\u0043\u006f\u006e\u0065\u0063\u0074\u0061\u0020\u006f\u0074\u0072\u006f\u0020\u0065\u0071\u0075\u0069\u0070\u006f\u0020\u0061\u0064\u0069\u0063\u0069\u006f\u006e\u0061\u006c\u002e'+"</p>";
						break;
					case '\u0033\u0020\u004d\u0062\u0070\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0033\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0049\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0072\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0033\u0020\u0050\u0043\u00b4\u0073\u002e\u0020\u0044\u0065\u0073\u0063\u0061\u0072\u0067\u0061\u0020\u0033\u0020\u0063\u0061\u006e\u0063\u0069\u006f\u006e\u0065\u0073\u0020\u0065\u006e\u0020\u006d\u0065\u006e\u006f\u0073\u0020\u0064\u0065\u0020\u0075\u006e\u0020\u006d\u0069\u006e\u0075\u0074\u006f'+"</p>";
						break;
					case '\u0033\u0020\u004d\u0065\u0067\u0061\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0033\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0049\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0072\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0033\u0020\u0050\u0043\u00b4\u0073\u002e\u0020\u0044\u0065\u0073\u0063\u0061\u0072\u0067\u0061\u0020\u0033\u0020\u0063\u0061\u006e\u0063\u0069\u006f\u006e\u0065\u0073\u0020\u0065\u006e\u0020\u006d\u0065\u006e\u006f\u0073\u0020\u0064\u0065\u0020\u0075\u006e\u0020\u006d\u0069\u006e\u0075\u0074\u006f'+"</p>";
						break;
					case '\u0034\u0020\u004d\u0062\u0070\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0034\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0075\u0020\u0068\u006f\u0067\u0061\u0072\u002c\u0020\u006e\u0061\u0076\u0065\u0067\u0061\u0020\u0063\u006f\u006e\u0020\u006d\u00e1\u0078\u0069\u006d\u0061\u0020\u0076\u0065\u006c\u006f\u0063\u0069\u0064\u0061\u0064\u0020\u006d\u0069\u0065\u006e\u0074\u0072\u0061\u0073\u0020\u0064\u0065\u0073\u0063\u0075\u0062\u0072\u0065\u0073\u0020\u0065\u006c\u0020\u006d\u0065\u006a\u006f\u0072\u0020\u0065\u006e\u0074\u0072\u0065\u0074\u0065\u006e\u0069\u006d\u0069\u0065\u006e\u0074\u006f\u002e'+"</p>";
						break;
					case '\u0034\u0020\u004d\u0065\u0067\u0061\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0034\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0075\u0020\u0068\u006f\u0067\u0061\u0072\u002c\u0020\u006e\u0061\u0076\u0065\u0067\u0061\u0020\u0063\u006f\u006e\u0020\u006d\u00e1\u0078\u0069\u006d\u0061\u0020\u0076\u0065\u006c\u006f\u0063\u0069\u0064\u0061\u0064\u0020\u006d\u0069\u0065\u006e\u0074\u0072\u0061\u0073\u0020\u0064\u0065\u0073\u0063\u0075\u0062\u0072\u0065\u0073\u0020\u0065\u006c\u0020\u006d\u0065\u006a\u006f\u0072\u0020\u0065\u006e\u0074\u0072\u0065\u0074\u0065\u006e\u0069\u006d\u0069\u0065\u006e\u0074\u006f\u002e'+"</p>";
						break;
					case '\u0035\u0020\u004d\u0062\u0070\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0035\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0049\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0072\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0034\u0020\u0050\u0043\u00b4\u0073\u002e\u0020\u0044\u0065\u0073\u0063\u0061\u0072\u0067\u0061\u0020\u0020\u0063\u0061\u006e\u0063\u0069\u006f\u006e\u0065\u0073\u0020\u0065\u006e\u0020\u0031\u0031\u0020\u0073\u0065\u0067\u0075\u006e\u0064\u006f\u0073'+"</p>";
						break;
					case '\u0035\u0020\u004d\u0065\u0067\u0061\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0035\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0049\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0072\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0034\u0020\u0050\u0043\u00b4\u0073\u002e\u0020\u0044\u0065\u0073\u0063\u0061\u0072\u0067\u0061\u0020\u0020\u0063\u0061\u006e\u0063\u0069\u006f\u006e\u0065\u0073\u0020\u0065\u006e\u0020\u0031\u0031\u0020\u0073\u0065\u0067\u0075\u006e\u0064\u006f\u0073'+"</p>";
						break;
					case '\u0037\u0020\u004d\u0062\u0070\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0037\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0075\u0020\u0068\u006f\u0067\u0061\u0072\u002c\u0020\u006e\u0061\u0076\u0065\u0067\u0061\u0064\u006f\u0072\u002c\u0020\u0063\u0068\u0061\u0074\u002c\u0020\u006d\u0061\u0069\u006c\u002c\u0020\u0072\u0065\u0064\u0065\u0073\u0020\u0073\u006f\u0063\u0069\u0061\u006c\u0065\u0073\u002c\u0020\u0076\u0069\u0064\u0065\u006f\u0073\u0020\u0048\u0044\u002c\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0035\u0020\u0050\u0043\u0027\u0073\u002e'+"</p>";
						break;
					case '\u0037\u0020\u004d\u0065\u0067\u0061\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0037\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0075\u0020\u0068\u006f\u0067\u0061\u0072\u002c\u0020\u006e\u0061\u0076\u0065\u0067\u0061\u0064\u006f\u0072\u002c\u0020\u0063\u0068\u0061\u0074\u002c\u0020\u006d\u0061\u0069\u006c\u002c\u0020\u0072\u0065\u0064\u0065\u0073\u0020\u0073\u006f\u0063\u0069\u0061\u006c\u0065\u0073\u002c\u0020\u0076\u0069\u0064\u0065\u006f\u0073\u0020\u0048\u0044\u002c\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0035\u0020\u0050\u0043\u0027\u0073\u002e'+"</p>";
						break;
					case '\u0038\u0020\u004d\u0062\u0070\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0038\u0020\u004d\u0062\u0070\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0075\u0020\u0068\u006f\u0067\u0061\u0072\u002c\u0020\u006e\u0061\u0076\u0065\u0067\u0061\u0064\u006f\u0072\u002c\u0020\u0063\u0068\u0061\u0074\u002c\u0020\u006d\u0061\u0069\u006c\u002c\u0020\u0072\u0065\u0064\u0065\u0073\u0020\u0073\u006f\u0063\u0069\u0061\u006c\u0065\u0073\u002c\u0020\u0076\u0069\u0064\u0065\u006f\u0073\u0020\u0048\u0044\u002c\u0020\u006a\u0075\u0065\u0067\u006f\u0073\u0020\u004f\u006e\u0020\u004c\u0069\u006e\u0065\u002c\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0036\u0020\u0050\u0043\u0027\u0073\u002e'+"</p>";
						break;
					case '\u0038\u0020\u004d\u0065\u0067\u0061\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0038\u0020\u004d\u0062\u0070\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0075\u0020\u0068\u006f\u0067\u0061\u0072\u002c\u0020\u006e\u0061\u0076\u0065\u0067\u0061\u0064\u006f\u0072\u002c\u0020\u0063\u0068\u0061\u0074\u002c\u0020\u006d\u0061\u0069\u006c\u002c\u0020\u0072\u0065\u0064\u0065\u0073\u0020\u0073\u006f\u0063\u0069\u0061\u006c\u0065\u0073\u002c\u0020\u0076\u0069\u0064\u0065\u006f\u0073\u0020\u0048\u0044\u002c\u0020\u006a\u0075\u0065\u0067\u006f\u0073\u0020\u004f\u006e\u0020\u004c\u0069\u006e\u0065\u002c\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0036\u0020\u0050\u0043\u0027\u0073\u002e'+"</p>";
						break;
					case '\u0039\u0020\u004d\u0062\u0070\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0039\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0075\u0020\u0068\u006f\u0067\u0061\u0072\u002c\u0020\u006e\u0061\u0076\u0065\u0067\u0061\u0064\u006f\u0072\u002c\u0020\u0063\u0068\u0061\u0074\u002c\u0020\u006d\u0061\u0069\u006c\u002c\u0020\u0072\u0065\u0064\u0065\u0073\u0020\u0073\u006f\u0063\u0069\u0061\u006c\u0065\u0073\u002c\u0020\u0076\u0069\u0064\u0065\u006f\u0073\u0020\u0048\u0044\u002c\u0020\u006a\u0075\u0065\u0067\u006f\u0073\u0020\u004f\u006e\u0020\u004c\u0069\u006e\u0065\u002c\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0036\u0020\u0050\u0043\u0027\u0073\u002e'+"</p>";
						break;
					case '\u0039\u0020\u004d\u0065\u0067\u0061\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0039\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0075\u0020\u0068\u006f\u0067\u0061\u0072\u002c\u0020\u006e\u0061\u0076\u0065\u0067\u0061\u0064\u006f\u0072\u002c\u0020\u0063\u0068\u0061\u0074\u002c\u0020\u006d\u0061\u0069\u006c\u002c\u0020\u0072\u0065\u0064\u0065\u0073\u0020\u0073\u006f\u0063\u0069\u0061\u006c\u0065\u0073\u002c\u0020\u0076\u0069\u0064\u0065\u006f\u0073\u0020\u0048\u0044\u002c\u0020\u006a\u0075\u0065\u0067\u006f\u0073\u0020\u004f\u006e\u0020\u004c\u0069\u006e\u0065\u002c\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0036\u0020\u0050\u0043\u0027\u0073\u002e'+"</p>";
						break;
					case '\u0031\u0030\u0020\u004d\u0062\u0070\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0031\u0030\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0049\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0072\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0036\u0020\u0050\u0043\u00b4\u0073\u002e\u0020\u0044\u0065\u0073\u0063\u0061\u0072\u0067\u0061\u0020\u0031\u0035\u0020\u0063\u0061\u006e\u0063\u0069\u006f\u006e\u0065\u0073\u0020\u0065\u006e\u0020\u006d\u0065\u006e\u006f\u0073\u0020\u0064\u0065\u0020\u0075\u006e\u0020\u006d\u0069\u006e\u0075\u0074\u006f\u002e'+"</p>";
						break;
					case '\u0031\u0030\u0020\u004d\u0065\u0067\u0061\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0031\u0030\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0049\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0072\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0036\u0020\u0050\u0043\u00b4\u0073\u002e\u0020\u0044\u0065\u0073\u0063\u0061\u0072\u0067\u0061\u0020\u0031\u0035\u0020\u0063\u0061\u006e\u0063\u0069\u006f\u006e\u0065\u0073\u0020\u0065\u006e\u0020\u006d\u0065\u006e\u006f\u0073\u0020\u0064\u0065\u0020\u0075\u006e\u0020\u006d\u0069\u006e\u0075\u0074\u006f\u002e'+"</p>";
						break;
					case '\u0031\u0032\u0020\u004d\u0062\u0070\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0031\u0032\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0075\u0020\u0068\u006f\u0067\u0061\u0072\u002c\u0020\u006e\u0061\u0076\u0065\u0067\u0061\u0064\u006f\u0072\u002c\u0020\u0063\u0068\u0061\u0074\u002c\u0020\u006d\u0061\u0069\u006c\u002c\u0020\u0072\u0065\u0064\u0065\u0073\u0020\u0073\u006f\u0063\u0069\u0061\u006c\u0065\u0073\u002c\u0020\u0076\u0069\u0064\u0065\u006f\u0073\u0020\u0048\u0044\u002c\u0020\u006a\u0075\u0065\u0067\u006f\u0073\u0020\u004f\u006e\u0020\u004c\u0069\u006e\u0065\u002c\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0038\u0020\u0050\u0043\u0027\u0073\u002e'+"</p>";
						break;
					case '\u0031\u0032\u0020\u004d\u0065\u0067\u0061\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0031\u0032\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0075\u0020\u0068\u006f\u0067\u0061\u0072\u002c\u0020\u006e\u0061\u0076\u0065\u0067\u0061\u0064\u006f\u0072\u002c\u0020\u0063\u0068\u0061\u0074\u002c\u0020\u006d\u0061\u0069\u006c\u002c\u0020\u0072\u0065\u0064\u0065\u0073\u0020\u0073\u006f\u0063\u0069\u0061\u006c\u0065\u0073\u002c\u0020\u0076\u0069\u0064\u0065\u006f\u0073\u0020\u0048\u0044\u002c\u0020\u006a\u0075\u0065\u0067\u006f\u0073\u0020\u004f\u006e\u0020\u004c\u0069\u006e\u0065\u002c\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0038\u0020\u0050\u0043\u0027\u0073\u002e'+"</p>";
						break;
					case '\u0031\u0035\u0020\u004d\u0062\u0070\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0031\u0035\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0075\u0020\u0068\u006f\u0067\u0061\u0072\u002c\u0020\u006e\u0061\u0076\u0065\u0067\u0061\u0064\u006f\u0072\u002c\u0020\u0063\u0068\u0061\u0074\u002c\u0020\u006d\u0061\u0069\u006c\u002c\u0020\u0072\u0065\u0064\u0065\u0073\u0020\u0073\u006f\u0063\u0069\u0061\u006c\u0065\u0073\u002c\u0020\u0076\u0069\u0064\u0065\u006f\u0073\u0020\u0048\u0044\u002c\u0020\u006a\u0075\u0065\u0067\u006f\u0073\u0020\u004f\u006e\u0020\u004c\u0069\u006e\u0065\u002c\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0031\u0030\u0020\u0050\u0043\u0027\u0073\u002e'+"</p>";
						break;
					case '\u0031\u0035\u0020\u004d\u0065\u0067\u0061\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0031\u0035\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0075\u0020\u0068\u006f\u0067\u0061\u0072\u002c\u0020\u006e\u0061\u0076\u0065\u0067\u0061\u0064\u006f\u0072\u002c\u0020\u0063\u0068\u0061\u0074\u002c\u0020\u006d\u0061\u0069\u006c\u002c\u0020\u0072\u0065\u0064\u0065\u0073\u0020\u0073\u006f\u0063\u0069\u0061\u006c\u0065\u0073\u002c\u0020\u0076\u0069\u0064\u0065\u006f\u0073\u0020\u0048\u0044\u002c\u0020\u006a\u0075\u0065\u0067\u006f\u0073\u0020\u004f\u006e\u0020\u004c\u0069\u006e\u0065\u002c\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0031\u0030\u0020\u0050\u0043\u0027\u0073\u002e'+"</p>";
						break;
					case '\u0032\u0030\u0020\u004d\u0062\u0070\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0032\u0030\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0072\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0038\u0020\u0064\u0069\u0073\u0070\u006f\u0073\u0069\u0074\u0069\u0076\u006f\u0073\u002c\u0020\u0044\u0065\u0073\u0063\u0061\u0072\u0067\u0061\u0020\u0079\u0020\u0064\u0069\u0073\u0066\u0072\u0075\u0074\u0061\u0020\u0064\u0065\u0020\u0076\u0069\u0064\u0065\u006f\u0073\u0020\u0055\u006c\u0074\u0072\u0061\u0020\u0048\u0044\u0020\u0079\u0020\u004a\u0075\u0065\u0067\u006f\u0073\u0020\u004f\u006e\u006c\u0069\u006e\u0065\u0020\u0048\u0044\u002e\u0020\u0044\u0065\u0073\u0063\u0061\u0072\u0067\u0061\u0020\u0043\u0061\u006e\u0063\u0069\u006f\u006e\u0065\u0073\u0020\u0065\u006e\u0020\u0033\u0020\u0053\u0065\u0067\u002e'+"</p>";
						break;
					case '\u0032\u0030\u0020\u004d\u0065\u0067\u0061\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0032\u0030\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0072\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0038\u0020\u0064\u0069\u0073\u0070\u006f\u0073\u0069\u0074\u0069\u0076\u006f\u0073\u002c\u0020\u0044\u0065\u0073\u0063\u0061\u0072\u0067\u0061\u0020\u0079\u0020\u0064\u0069\u0073\u0066\u0072\u0075\u0074\u0061\u0020\u0064\u0065\u0020\u0076\u0069\u0064\u0065\u006f\u0073\u0020\u0055\u006c\u0074\u0072\u0061\u0020\u0048\u0044\u0020\u0079\u0020\u004a\u0075\u0065\u0067\u006f\u0073\u0020\u004f\u006e\u006c\u0069\u006e\u0065\u0020\u0048\u0044\u002e\u0020\u0044\u0065\u0073\u0063\u0061\u0072\u0067\u0061\u0020\u0043\u0061\u006e\u0063\u0069\u006f\u006e\u0065\u0073\u0020\u0065\u006e\u0020\u0033\u0020\u0053\u0065\u0067\u002e'+"</p>";
						break;
					case '\u0034\u0030\u0020\u004d\u0062\u0070\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0034\u0030\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0072\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0038\u0020\u0064\u0069\u0073\u0070\u006f\u0073\u0069\u0074\u0069\u0076\u006f\u0073\u002e\u0020\u0044\u0065\u0073\u0063\u0061\u0072\u0067\u0061\u0020\u0079\u0020\u0064\u0069\u0073\u0066\u0072\u0075\u0074\u0061\u0020\u0064\u0065\u0020\u0076\u0069\u0064\u0065\u006f\u0073\u0020\u0055\u006c\u0074\u0072\u0061\u0020\u0048\u0044\u0020\u0079\u0020\u004a\u0075\u0065\u0067\u006f\u0073\u0020\u004f\u006e\u006c\u0069\u006e\u0065\u0020\u0048\u0044\u002e\u0020\u0044\u0065\u0073\u0063\u0061\u0072\u0067\u0061\u0020\u0043\u0061\u006e\u0063\u0069\u006f\u006e\u0065\u0073\u0020\u0065\u006e\u0020\u0031\u0020\u0053\u0065\u0067\u002e'+"</p>";
						break;
					case '\u0034\u0030\u0020\u004d\u0065\u0067\u0061\u0073':
						myOption += "<span>"+'\u0048\u0061\u0073\u0074\u0061\u0020\u0034\u0030\u0020\u004d\u0065\u0067\u0061\u0073'+"</span>";
						myOption += "<p>"+'\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0069\u006c\u0069\u006d\u0069\u0074\u0061\u0064\u006f\u0020\u0070\u0061\u0072\u0061\u0020\u0063\u006f\u006e\u0065\u0063\u0074\u0061\u0072\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0038\u0020\u0064\u0069\u0073\u0070\u006f\u0073\u0069\u0074\u0069\u0076\u006f\u0073\u002e\u0020\u0044\u0065\u0073\u0063\u0061\u0072\u0067\u0061\u0020\u0079\u0020\u0064\u0069\u0073\u0066\u0072\u0075\u0074\u0061\u0020\u0064\u0065\u0020\u0076\u0069\u0064\u0065\u006f\u0073\u0020\u0055\u006c\u0074\u0072\u0061\u0020\u0048\u0044\u0020\u0079\u0020\u004a\u0075\u0065\u0067\u006f\u0073\u0020\u004f\u006e\u006c\u0069\u006e\u0065\u0020\u0048\u0044\u002e\u0020\u0044\u0065\u0073\u0063\u0061\u0072\u0067\u0061\u0020\u0043\u0061\u006e\u0063\u0069\u006f\u006e\u0065\u0073\u0020\u0065\u006e\u0020\u0031\u0020\u0053\u0065\u0067\u002e'+"</p>";
						break;
				}
				myOption += 	"</div>";
				myOption += "</div>";
			}
			$("#planesInternet").append( myOption );
			seteaPaso('planesInternet');

			jQuery('div.cajaPlanesInternet').click(function() {
				//monstramos la capa de bloqueo
				blockScreen.show();
				if (tipoDivPulsado == $(this).children(":first").attr("name")) {
					// si ya habíamos seleccionado antes otro DIV "hermano", nos cargamos el paso. Para que cuando demos al botón Siguiente, la "listPasos" (breadcrums) sea la correcta
					siguientePaso(false);
				}
				tipoDivPulsado = $(this).children(":first").attr("name");

				$(this).children("input:radio").prop('checked', true).attr("checked", true);
				if($(this).children("input:radio").is(':checked')){
					$('div.cajaPlanesInternet').removeClass('darkBox');
					$(this).addClass('darkBox');
				}else{
					$(this).removeClass('darkBox');
				}

				// al pinchar sobre la caja (div), simula un click sobre el radioButton (siempre que este sea el primer hijo)
				selectPlanInternet(divipolaSelected, estratoSelected, productoSelected, planVozSelected, $(this).children(":first").val());
			});
		},
		complete: function(){
			//console.log("COMPLETE LOAD DE PLAN INTERNET");
			blockScreen.hide();
		}
	});
}

function selectPlanInternet(divipolaSelected, estratoSelected, productoSelected, planVozSelected, planInternetSelected) {
	globalPageNameDataLayer = dataLayer_seleccionaInternet( globalPageNameDataLayer, planInternetSelected );

	if (productoSelected == '\u0044\u0055\u004f\u0020\u0042\u0041') {

		// voz + internet
		displayValue( divipolaSelected, estratoSelected, productoSelected, planVozSelected, planInternetSelected, '', '', new Array(), '' );

	} else {

		// voz + internet + tv
		loadPlanTv(divipolaSelected, estratoSelected, productoSelected, planVozSelected, planInternetSelected);

	}
}

function loadPlanTv(divipolaSelected, estratoSelected, productoSelected, planVozSelected, planInternetSelected) {
	//console.log("loadPlanTv( "+divipolaSelected+", "+estratoSelected+", "+productoSelected+", "+planVozSelected+", "+planInternetSelected+" )");

	jQuery.ajax({
		type : "post",
		url : myResourceURL,
		dataType : 'json',
		data : {
			'accion' : 'loadPlans_TV',
			'ciudad' : divipolaSelected,
			'estrato' : estratoSelected,
			'producto' : productoSelected,
			'planLB' : planVozSelected,
			'planBA' : planInternetSelected
		},
		success : function(data) {
			$("#planesTv").empty();
		var myOption = "<h4 class='subTitProductos'>"+'\u0044\u0069\u0073\u0066\u0072\u0075\u0074\u0061\u0020\u0064\u0065\u0020\u006c\u0061\u0020\u006d\u0065\u006a\u006f\u0072\u0020\u0063\u0061\u006c\u0069\u0064\u0061\u0064\u0020\u0064\u0065\u0020\u0069\u006d\u0061\u0067\u0065\u006e\u0020\u0079\u0020\u0073\u006f\u006e\u0069\u0064\u006f\u0020\u006d\u0069\u0065\u006e\u0074\u0072\u0061\u0073\u0020\u0074\u0065\u0020\u0064\u0069\u0076\u0069\u0065\u0072\u0074\u0065\u0073\u002e\u0020\u0045\u0073\u0063\u006f\u0067\u0065\u0020\u0065\u006c\u0020\u0070\u006c\u0061\u006e\u0020\u0069\u0064\u0065\u0061\u006c\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0075\u0020\u0068\u006f\u0067\u0061\u0072\u002e'+"</h4>";
			for (k=0; k<data.length; k++) {
				myOption += "<div class='span6 xs-span-12'>";
				myOption += 	"<div class='cajaPlanesTv'>";
				myOption +=			"<input type='radio' name='planTV' value='"+data[k].plan+"' />";

				switch (data[k].plan) {
					case '\u0050\u006c\u0061\u006e\u0020\u005a\u0061\u0066\u0069\u0072\u006f':
						myOption += '<div>'
										+'<span>'+'\u0050\u006c\u0061\u006e\u0020\u005a\u0061\u0066\u0069\u0072\u006f'+'</span>'
										+'<p>'+'\u0050\u0061\u0072\u0061\u0020\u0063\u006f\u006d\u0070\u0061\u0072\u0074\u0069\u0072\u0020\u0063\u006f\u006e\u0020\u006c\u006f\u0073\u0020\u0074\u0075\u0079\u006f\u0073\u0020\u0075\u006e\u0061\u0020\u0070\u0072\u006f\u0067\u0072\u0061\u006d\u0061\u0063\u0069\u0026\u006f\u0061\u0063\u0075\u0074\u0065\u003b\u006e\u0020\u0064\u0065\u0020\u0063\u0061\u006c\u0069\u0064\u0061\u0064\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u006f\u0064\u0061\u0073\u0020\u006c\u0061\u0073\u0020\u0065\u0064\u0061\u0064\u0065\u0073\u002e\u0020\u0049\u006e\u0063\u006c\u0075\u0079\u0065\u0020\u0038\u0032\u0020\u0043\u0061\u006e\u0061\u006c\u0065\u0073\u0020\u0053\u0044\u0020\u002b\u0020\u0036\u0020\u0043\u0061\u006e\u0061\u006c\u0065\u0073\u0020\u004f\u006e\u006c\u0069\u006e\u0065\u0020\u002b\u0020\u0036\u0020\u0043\u0061\u006e\u0061\u006c\u0065\u0073\u0020\u0048\u0044\u0020\u0070\u0061\u0072\u0061\u0020\u0071\u0075\u0065\u0020\u0064\u0069\u0073\u0066\u0072\u0075\u0074\u0065\u0073\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0065\u006c\u0020\u0033\u0031\u0020\u0064\u0065\u0020\u004f\u0063\u0074\u0075\u0062\u0072\u0065\u0020\u0064\u0065\u0020\u0032\u0030\u0031\u0036\u002e'+'</p>'
										+'<a href="http://www.movistar.co/descubre/television/planes/plan-zafiro" target="_blank">'+'\u004d\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u0073\u0020\u0069\u006e\u0066\u006f\u0020\u0061\u0071\u0075\u00ed\u002e\u002e\u002e'+'</a>'
									+'</div>';
						break;
					case '\u0050\u006c\u0061\u006e\u0020\u0044\u0069\u0061\u006d\u0061\u006e\u0074\u0065':
						myOption += '<div>'
										+'<span>'+'\u0050\u006c\u0061\u006e\u0020\u0044\u0069\u0061\u006d\u0061\u006e\u0074\u0065'+'</span>'
										+'<p>'+'\u0045\u0073\u0020\u0069\u0064\u0065\u0061\u006c\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0069\u0020\u0071\u0075\u0065\u0020\u0073\u0061\u0062\u0065\u0073\u0020\u0065\u006c\u0065\u0067\u0069\u0072\u0020\u0062\u0075\u0065\u006e\u0061\u0073\u0020\u0073\u0065\u0072\u0069\u0065\u0073\u0020\u0079\u0020\u0065\u0078\u0063\u0065\u006c\u0065\u006e\u0074\u0065\u0020\u0070\u0065\u006c\u0026\u0069\u0061\u0063\u0075\u0074\u0065\u003b\u0063\u0075\u006c\u0061\u0073\u002e\u0020\u0049\u006e\u0063\u006c\u0075\u0079\u0065\u0020\u0031\u0030\u0036\u0020\u0043\u0061\u006e\u0061\u006c\u0065\u0073\u0020\u0053\u0044\u0020\u002b\u0020\u0036\u0020\u0043\u0061\u006e\u0061\u006c\u0065\u0073\u0020\u004f\u006e\u006c\u0069\u006e\u0065\u0020\u002b\u0020\u0031\u0030\u0020\u0043\u0061\u006e\u0061\u006c\u0065\u0073\u0020\u0064\u0065\u0020\u0041\u0075\u0064\u0069\u006f\u0020\u002b\u0020\u0036\u0020\u0043\u0061\u006e\u0061\u006c\u0065\u0073\u0020\u0048\u0044\u0020\u0070\u0061\u0072\u0061\u0020\u0071\u0075\u0065\u0020\u0064\u0069\u0073\u0066\u0072\u0075\u0074\u0065\u0073\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0065\u006c\u0020\u0033\u0031\u0020\u0064\u0065\u0020\u004f\u0063\u0074\u0075\u0062\u0072\u0065\u0020\u0064\u0065\u0020\u0032\u0030\u0031\u0036\u002e'+'</p>'
										+'<a href="http://www.movistar.co/descubre/television/planes/plan-diamante" target="_blank">'+'\u004d\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u0073\u0020\u0069\u006e\u0066\u006f\u0020\u0061\u0071\u0075\u00ed\u002e\u002e\u002e'+'</a>'
									+'</div>';
						break;
					case '\u0050\u006c\u0061\u006e\u0020\u0044\u0069\u0061\u006d\u0061\u006e\u0074\u0065\u0020\u0050\u006c\u0075\u0073':
						myOption += '<div>'
										+'<span>'+'\u0050\u006c\u0061\u006e\u0020\u0044\u0069\u0061\u006d\u0061\u006e\u0074\u0065\u0020\u0050\u006c\u0075\u0073'+'</span>'
										+'<p>'+'\u0044\u0065\u0073\u0063\u0075\u0062\u0072\u0065\u0020\u006e\u0075\u0065\u0076\u0061\u0073\u0020\u0073\u0065\u006e\u0073\u0061\u0063\u0069\u006f\u006e\u0065\u0073\u0020\u0065\u006e\u0020\u0065\u006e\u0074\u0072\u0065\u0074\u0065\u006e\u0069\u006d\u0069\u0065\u006e\u0074\u006f\u0020\u0079\u0020\u0063\u0061\u006e\u0061\u006c\u0065\u0073\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u006f\u0064\u0061\u0020\u006c\u0061\u0020\u0066\u0061\u006d\u0069\u006c\u0069\u0061\u002e\u0020\u0049\u006e\u0063\u006c\u0075\u0079\u0065\u0020\u0031\u0030\u0036\u0020\u0043\u0061\u006e\u0061\u006c\u0065\u0073\u0020\u0053\u0044\u0020\u002b\u0020\u0035\u0020\u004f\u006e\u006c\u0069\u006e\u0065\u0020\u002b\u0020\u0031\u0030\u0020\u0041\u0075\u0064\u0069\u006f\u0020\u002b\u0020\u0033\u0036\u0020\u0048\u0044'+'</p>'
										+'<a href="http://www.movistar.co/descubre/television/planes/plan-diamante-plus" target="_blank">'+'\u004d\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u0073\u0020\u0069\u006e\u0066\u006f\u0020\u0061\u0071\u0075\u00ed\u002e\u002e\u002e'+'</a>'
									+'</div>';
						break;
					case '\u0050\u006c\u0061\u006e\u0020\u0044\u0069\u0061\u006d\u0061\u006e\u0074\u0065\u0020\u0054\u006f\u0074\u0061\u006c':
						myOption += '<div>'
										+'<span>'+'\u0050\u006c\u0061\u006e\u0020\u0044\u0069\u0061\u006d\u0061\u006e\u0074\u0065\u0020\u0054\u006f\u0074\u0061\u006c'+'</span>'
										+'<p>'+'\u0045\u0073\u0020\u0069\u0064\u0065\u0061\u006c\u0020\u0070\u0061\u0072\u0061\u0020\u0074\u0069\u0020\u0071\u0075\u0065\u0020\u0073\u0061\u0062\u0065\u0073\u0020\u0065\u006c\u0065\u0067\u0069\u0072\u0020\u0062\u0075\u0065\u006e\u0061\u0073\u0020\u0073\u0065\u0072\u0069\u0065\u0073\u0020\u0079\u0020\u0065\u0078\u0063\u0065\u006c\u0065\u006e\u0074\u0065\u0020\u0070\u0065\u006c\u0026\u0069\u0061\u0063\u0075\u0074\u0065\u003b\u0063\u0075\u006c\u0061\u0073\u002e\u0020\u0049\u006e\u0063\u006c\u0075\u0079\u0065\u0020\u0031\u0030\u0036\u0020\u0043\u0061\u006e\u0061\u006c\u0065\u0073\u0020\u0053\u0044\u0020\u002b\u0020\u0035\u0020\u004f\u006e\u006c\u0069\u006e\u0065\u0020\u002b\u0020\u0031\u0030\u0020\u0041\u0075\u0064\u0069\u006f\u0020\u002b\u0020\u0035\u0034\u0020\u0048\u0044'+'</p>'
										+'<a href="http://www.movistar.co/descubre/television/planes/plan-diamante-total" target="_blank">'+'\u004d\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u0073\u0020\u0069\u006e\u0066\u006f\u0020\u0061\u0071\u0075\u00ed\u002e\u002e\u002e'+'</a>'
									+'</div>';
						break;
				}

				myOption += 	"</div>";
				myOption += "</div>";
			}

//			if ("TV SOLA" == productoSelected) {
//				myOption += "<div class='span6 xs-span-12'>"
//								+"<div class='cajaPlanesTv_2'>"
//									+'<span>'+'\u005a\u0061\u0066\u0069\u0072\u006f\u0020\u002b\u0020\u004d\u006f\u0076\u0069\u006c\u0020\u0024\u0034\u0030\u002e\u0039\u0030\u0030'+'</span>'
//									+'<p>'+'\u0050\u0061\u0072\u0061\u0020\u0061\u0063\u0063\u0065\u0064\u0065\u0072\u0020\u0061\u0020\u0065\u0073\u0074\u0065\u0020\u0062\u0065\u006e\u0065\u0066\u0069\u0063\u0069\u006f\u0020\u0064\u0065\u0062\u0065\u0073\u0020\u0063\u006f\u006d\u0070\u0072\u0061\u0072\u0020\u0075\u006e\u0020\u0065\u0071\u0075\u0069\u0070\u006f\u0020\u0065\u006e\u0020\u0070\u006f\u0073\u0070\u0061\u0067\u006f'+'</p>'
//									+'<a href="https://canalesalternos.movistar.co/WebAPI810/Chat/Chat_TiendaPub/inicio_tiendapubmovistar.jsp" target="_blank">'+'\u004d\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u0073\u0020\u0069\u006e\u0066\u006f\u0020\u0061\u0071\u0075\u00ed\u002e\u002e\u002e'+'</a>'
//								+'</div>'
//							+'</div>';
//				myOption += "<div class='span6 xs-span-12'>"
//								+"<div class='cajaPlanesTv_2'>"
//									+'<span>'+'\u0044\u0069\u0061\u006d\u0061\u006e\u0074\u0065\u0020\u002b\u0020\u004d\u006f\u0076\u0069\u006c\u0020\u0024\u0036\u0031\u002e\u0039\u0030\u0030'+'</span>'
//									+'<p>'+'\u0050\u0061\u0072\u0061\u0020\u0061\u0063\u0063\u0065\u0064\u0065\u0072\u0020\u0061\u0020\u0065\u0073\u0074\u0065\u0020\u0062\u0065\u006e\u0065\u0066\u0069\u0063\u0069\u006f\u0020\u0064\u0065\u0062\u0065\u0073\u0020\u0063\u006f\u006d\u0070\u0072\u0061\u0072\u0020\u0075\u006e\u0020\u0065\u0071\u0075\u0069\u0070\u006f\u0020\u0065\u006e\u0020\u0070\u006f\u0073\u0070\u0061\u0067\u006f'+'</p>'
//									+'<a href="https://canalesalternos.movistar.co/WebAPI810/Chat/Chat_TiendaPub/inicio_tiendapubmovistar.jsp" target="_blank">'+'\u004d\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u0073\u0020\u0069\u006e\u0066\u006f\u0020\u0061\u0071\u0075\u00ed\u002e\u002e\u002e'+'</a>'
//								+'</div>'
//							+'</div>';
//			}

			$("#planesTv").append( myOption );
			seteaPaso('planesTv');

			jQuery('div.cajaPlanesTv').click(function() {
				//monstramos la capa de bloqueo
				blockScreen.show();
				if (tipoDivPulsado == $(this).children(":first").attr("name")) {
					// si ya habíamos seleccionado antes otro DIV "hermano", nos cargamos el paso. Para que cuando demos al botón Siguiente, la "listPasos" (breadcrums) sea la correcta
					siguientePaso(false);
				}
				tipoDivPulsado = $(this).children(":first").attr("name");

				$(this).children("input:radio").prop('checked', true).attr("checked", true);
				if($(this).children("input:radio").is(':checked')){
					$('div.cajaPlanesTv').removeClass('darkBox');
					$(this).addClass('darkBox');
				}else{
					$(this).removeClass('darkBox');
				}

				// al pinchar sobre la caja (div), simula un click sobre el radioButton (siempre que este sea el primer hijo)
				selectPlanTV(divipolaSelected, estratoSelected, productoSelected, planVozSelected, planInternetSelected, $(this).children(":first").val());
			});
		},
		complete : function (){
			//console.log("COMPLETE LOAD PLAN TV");
			blockScreen.hide();
		}
	});
}

function selectPlanTV(divipolaSelected, estratoSelected, productoSelected, planVozSelected, planInternetSelected, planTvSelected) {
	globalPageNameDataLayer = dataLayer_seleccionaTV( globalPageNameDataLayer, planTvSelected );

	jQuery.ajax({
		type : "post",
		url : myResourceURL,
		dataType : 'json',
		data : {
			'accion' : 'loadPlans_TV_HD',
			'ciudad' : divipolaSelected,
			'estrato' : estratoSelected,
			'producto' : productoSelected,
			'planLB' : planVozSelected,
			'planBA' : planInternetSelected,
			'planTV' : planTvSelected
		},
		success : function(data) {
			//Comprobamos si hay planes hd
			if(data.length != 0){
				hasPlanTvHd = true;
			}

			if (planTvSelected!='\u0050\u006c\u0061\u006e\u0020\u0044\u0069\u0061\u006d\u0061\u006e\u0074\u0065\u0020\u0050\u006c\u0075\u0073' && planTvSelected!='\u0050\u006c\u0061\u006e\u0020\u0044\u0069\u0061\u006d\u0061\u006e\u0074\u0065\u0020\u0054\u006f\u0074\u0061\u006c') {
				if(hasPlanTvHd){
					loadPlanTvHd(divipolaSelected, estratoSelected, productoSelected, planVozSelected, planInternetSelected, planTvSelected);
				}else{
					loadDecos(divipolaSelected, estratoSelected, productoSelected, planVozSelected, planInternetSelected, planTvSelected, '', 'S')
				}
			} else {

				loadDecos(divipolaSelected, estratoSelected, productoSelected, planVozSelected, planInternetSelected, planTvSelected, '', 'S');

			}

			hasPlanTvHd = false;

		}
		});


}

function loadPlanTvHd(divipolaSelected, estratoSelected, productoSelected, planVozSelected, planInternetSelected, planTvSelected) {
	//console.log("loadPlanTvHd( "+divipolaSelected+", "+estratoSelected+", "+productoSelected+", "+planVozSelected+", "+planInternetSelected+", "+planTvSelected+" )");

	jQuery.ajax({
		type : "post",
		url : myResourceURL,
		dataType : 'json',
		data : {
			'accion' : 'loadPlans_TV_HD',
			'ciudad' : divipolaSelected,
			'estrato' : estratoSelected,
			'producto' : productoSelected,
			'planLB' : planVozSelected,
			'planBA' : planInternetSelected,
			'planTV' : planTvSelected
		},
		success : function(data) {
			$("#planesTvHd").empty();
		var myOption = "<h4 class='subTitProductos'>"+'\u004d\u0065\u006a\u006f\u0072\u0061\u0020\u0065\u006c\u0020\u0050\u006c\u0061\u006e\u0020\u0071\u0075\u0065\u0020\u0079\u0061\u0020\u0065\u0073\u0063\u006f\u0067\u0069\u0073\u0074\u0065\u0020\u0073\u0065\u006c\u0065\u0063\u0063\u0069\u006f\u006e\u0061\u006e\u0064\u006f\u0020\u0061\u006c\u0067\u0075\u006e\u006f\u0020\u0064\u0065\u0020\u006c\u006f\u0073\u0020\u0073\u0069\u0067\u0075\u0069\u0065\u006e\u0074\u0065\u0073\u0020\u0070\u006c\u0061\u006e\u0065\u0073\u0020\u0048\u0044\u003a'+"</h4>";
			//para no monstrar la caja
			myOption += "<div class='span6 xs-span-12' style='display:none'>";
			myOption +=		"<div class='cajaPlanesTvHd'>"
								+"<input type='radio' name='planTVHD' value='' aplicahd='' id='planTvBasico' />"
								+"<span>"+'\u0050\u006c\u0061\u006e\u0020\u0062\u00e1\u0073\u0069\u0063\u006f\u0020\u0028\u0073\u0069\u006e\u0020\u0048\u0044\u0029'+"</span>"
							+"</div>";
			myOption +=	"</div>";
			for (k=0; k<data.length; k++) {
				myOption += "<div class='span6 xs-span-12'>";
				myOption += 	"<div class='cajaPlanesTvHd'>";
				switch (data[k].svaTV) {
					// ojo, debería haber mas CASE, por ejemplo: 'Mini Pack HD' !!!!!!!!!!!!!!!!!!!
					case '\u0048\u0044\u0020\u0050\u004c\u0055\u0053':
						myOption +=	"<input type='radio' name='planTVHD' value='"+data[k].svaTV+"' aplicahd='"+data[k].aplicaHD+"' />";
						myOption += "<div>"
										+"<span>"+'\u0050\u0061\u0071\u0075\u0065\u0074\u0065\u0020\u0048\u0044\u0020\u0050\u006c\u0075\u0073'+"</span>"
										+"<p>"+'\u0045\u0073\u0074\u0065\u0020\u0070\u0061\u0071\u0075\u0065\u0074\u0065\u0020\u0063\u006f\u006e\u0074\u0069\u0065\u006e\u0065\u0020\u0034\u0034\u0020\u0043\u0061\u006e\u0061\u006c\u0065\u0073\u0020\u0065\u006e\u0020\u0048\u0044\u002c\u0020\u0073\u006f\u006e\u0069\u0064\u006f\u0020\u0064\u0069\u0067\u0069\u0074\u0061\u006c\u0020\u0065\u006e\u0076\u006f\u006c\u0076\u0065\u006e\u0074\u0065\u002c\u0020\u0033\u0033\u0025\u0020\u006d\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u0073\u0020\u0064\u0065\u0020\u0069\u006d\u0061\u0067\u0065\u006e\u0020\u0071\u0075\u0065\u0020\u0065\u006c\u0020\u0066\u006f\u0072\u006d\u0061\u0074\u006f\u0020\u0065\u0073\u0074\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u006e\u0064\u0061\u0072\u002e'+"</p>"
										+'<a href="http://www.movistar.co/movistar-tv-hd" target="_blank">'+'\u004d\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u0073\u0020\u0069\u006e\u0066\u006f\u0020\u0061\u0071\u0075\u00ed\u002e\u002e\u002e'+'</a>'
									+"</div>";
						break;
					case '\u0048\u0044\u0020\u0054\u004f\u0054\u0041\u004c':
						myOption +=	"<input type='radio' name='planTVHD' value='"+data[k].svaTV+"' aplicahd='"+data[k].aplicaHD+"' />";
						myOption += "<div>"
										+"<span>"+'\u0050\u0061\u0071\u0075\u0065\u0074\u0065\u0020\u0048\u0044\u0020\u0054\u006f\u0074\u0061\u006c'+"</span>"
										+"<p>"+'\u0053\u0065\u0072\u0069\u0065\u0073\u002c\u0020\u0070\u0065\u006c\u0026\u0069\u0061\u0063\u0075\u0074\u0065\u003b\u0063\u0075\u006c\u0061\u0073\u0020\u0079\u0020\u0064\u0065\u0070\u006f\u0072\u0074\u0065\u0073\u0020\u0071\u0075\u0065\u0020\u0074\u0065\u0020\u0073\u006f\u0072\u0070\u0072\u0065\u006e\u0064\u0065\u0072\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u006e\u002e\u0020\u0043\u006f\u006e\u0074\u0069\u0065\u006e\u0065\u0020\u0036\u0034\u0020\u0043\u0061\u006e\u0061\u006c\u0065\u0073\u0020\u0065\u006e\u0020\u0048\u0044\u002c\u0020\u0073\u006f\u006e\u0069\u0064\u006f\u0020\u0064\u0069\u0067\u0069\u0074\u0061\u006c\u0020\u0079\u0020\u0033\u0033\u0025\u0020\u006d\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u0073\u0020\u0064\u0065\u0020\u0069\u006d\u0061\u0067\u0065\u006e\u0020\u0071\u0075\u0065\u0020\u0065\u006c\u0020\u0066\u006f\u0072\u006d\u0061\u0074\u006f\u0020\u0065\u0073\u0074\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u006e\u0064\u0061\u0072\u002e'+"</p>"
										+'<a href="http://www.movistar.co/movistar-tv-hd" target="_blank">'+'\u004d\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u0073\u0020\u0069\u006e\u0066\u006f\u0020\u0061\u0071\u0075\u00ed\u002e\u002e\u002e'+'</a>'
									+"</div>";
						break;
				}
				myOption += 	"</div>";
				myOption += "</div>";
			}
			$("#planesTvHd").append( myOption );
			seteaPaso('planesTvHd');

			//asignamos valores a los variables para el caso especial de planTvBasico
			divipolaSelectedTvBasico = divipolaSelected;
			estratoSelectedTvBasico = estratoSelected;
			productoSelectedTvBasico = productoSelected;
			planVozSelectedTvBasico = planVozSelected;
			planInternetSelectedTvBasico = planInternetSelected;
			planTvSelectedTvBasico = planTvSelected;


			jQuery('div.cajaPlanesTvHd').click(function() {
				//monstramos la capa de bloqueo
				blockScreen.show();

				if (tipoDivPulsado == $(this).children(":first").attr("name")) {
					// si ya habíamos seleccionado antes otro DIV "hermano", nos cargamos el paso. Para que cuando demos al botón Siguiente, la "listPasos" (breadcrums) sea la correcta
					siguientePaso(false);
				}
				tipoDivPulsado = $(this).children(":first").attr("name");

				$(this).children("input:radio").prop('checked', true).attr("checked", true);
				if($(this).children("input:radio").is(':checked')){
					$('div.cajaPlanesTvHd').removeClass('darkBox');
					$('#planTvBasico').attr("checked", false);
					$(this).addClass('darkBox');
					$("#tabs").hide();
				}else{
					$(this).removeClass('darkBox');
					$("#tabs").hide();
				}

				// al pinchar sobre la caja (div), simula un click sobre el radioButton (siempre que este sea el primer hijo)
				loadDecos(divipolaSelected, estratoSelected, productoSelected, planVozSelected, planInternetSelected, planTvSelected, $(this).children(":first").val(), $(this).children(":first").attr('aplicahd'));
				globalPageNameDataLayer = dataLayer_seleccionaTvHD( globalPageNameDataLayer, $(this).children(":first").val() );

			});
		},
		complete: function (){
			//console.log("COMPLETE LOAD DE TV HD");
			blockScreen.hide();
		}
	});
}

function loadDecos(divipolaSelected, estratoSelected, productoSelected, planVozSelected, planInternetSelected, planTvSelected, planTvHdSelected, aplicaHd) {
	//console.log("loadDecos( "+divipolaSelected+", "+estratoSelected+", "+productoSelected+", "+planVozSelected+", "+planInternetSelected+", "+planTvSelected+", "+planTvHdSelected+", "+aplicaHd+" )");

	listDecos = [];
	if (divipolaSelected == ID_CIUDAD_SANANDRES) {
		listDecos.push( '\u0044\u0065\u0063\u006f\u0064\u0069\u0066\u0069\u0063\u0061\u0064\u006f\u0072\u0020\u0045\u0073\u0074\u0061\u006e\u0064\u0061\u0072' );	// deco estandar por defecto
	} else {
		listDecos.push( '\u0044\u0065\u0063\u006f\u0064\u0069\u0066\u0069\u0063\u0061\u0064\u006f\u0072\u0020\u0048\u0044' );	// deco HD por defecto
	}

	$("#planesTvDecos").empty();
	var myOption = "<h4 class='subTitProductos'>"+'\u0053\u0069\u0020\u0074\u0069\u0065\u006e\u0065\u0073\u0020\u0075\u006e\u0020\u0074\u0065\u006c\u0065\u0076\u0069\u0073\u006f\u0072\u0020\u0061\u0064\u0069\u0063\u0069\u006f\u006e\u0061\u006c\u0020\u0079\u0020\u006e\u0065\u0063\u0065\u0073\u0069\u0074\u0061\u0073\u0020\u006f\u0074\u0072\u006f\u0020\u0064\u0065\u0063\u006f\u0064\u0069\u0066\u0069\u0063\u0061\u0064\u006f\u0072\u0020\u0073\u0065\u006c\u0065\u0063\u0063\u0069\u00f3\u006e\u0061\u006c\u006f\u002e\u0020\u0050\u0075\u0065\u0064\u0065\u0073\u0020\u0061\u00f1\u0061\u0064\u0069\u0072\u0020\u0068\u0061\u0073\u0074\u0061\u0020\u0075\u006e\u0020\u006d\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u0078\u0069\u006d\u006f\u0020\u0064\u0065\u0020\u0074\u0072\u0065\u0073\u003a'+"</h4>";
	if (divipolaSelected == ID_CIUDAD_SANANDRES) {
		myOption += "<div class='planTVDeco span12'>"
			+"<div class='imgDecoEstandar'></div>"
			+"<span>"+'\u0044\u0065\u0063\u006f\u0064\u0069\u0066\u0069\u0063\u0061\u0064\u006f\u0072\u0020\u0045\u0073\u0074\u00e1\u006e\u0064\u0061\u0072'+'</span>'
			+'<a href="'+myContextPathURL+'/img/decoTV/decoEstandarDescription.png" target="_blank">'+'\u004d\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u0073\u0020\u0069\u006e\u0066\u006f\u0020\u0061\u0071\u0075\u00ed\u002e\u002e\u002e'+'</a>'
			+"<select id='decoEstandar'>"
			+"<option value='0'>"+'\u0053\u0065\u006c\u0065\u0063\u0063\u0069\u006f\u006e\u0061\u0020\u006e\u0026\u0075\u0061\u0063\u0075\u0074\u0065\u003b\u006d\u0065\u0072\u006f\u0020\u0064\u0065\u0063\u006f\u0064\u0069\u0066\u0069\u0063\u0061\u0064\u006f\u0072\u0065\u0073'+"</option>"
			+"<option value='1'>"+1+"</option>"
			+"<option value='2'>"+2+"</option>"
			+"<option value='3'>"+3+"</option>"
			+"</select>"
			+"</div>";
	}
	if (
		//"S" == aplicaHd &&
			divipolaSelected != ID_CIUDAD_SANANDRES) {
		myOption += "<div class='planTVDeco span12'>"
						+"<div class='imgDecoHD'></div>"
						+"<span>"+'\u0044\u0065\u0063\u006f\u0064\u0069\u0066\u0069\u0063\u0061\u0064\u006f\u0072\u0020\u0048\u0044'+'</span>'
						+'<a href="'+myContextPathURL+'/img/decoTV/decoHDDescription.png" target="_blank">'+'\u004d\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u0073\u0020\u0069\u006e\u0066\u006f\u0020\u0061\u0071\u0075\u00ed\u002e\u002e\u002e'+'</a>'
						+"<select id='decoHd'>"
							+"<option value='0'>"+'\u0053\u0065\u006c\u0065\u0063\u0063\u0069\u006f\u006e\u0061\u0020\u006e\u0026\u0075\u0061\u0063\u0075\u0074\u0065\u003b\u006d\u0065\u0072\u006f\u0020\u0064\u0065\u0063\u006f\u0064\u0069\u0066\u0069\u0063\u0061\u0064\u006f\u0072\u0065\u0073'+"</option>"
							+"<option value='1'>"+1+"</option>"
							+"<option value='2'>"+2+"</option>"
							+"<option value='3'>"+3+"</option>"
						+"</select>"
					+"</div>";
		myOption += "<div class='planTVDeco span12'>"
						+"<div class='imgDecoHDPVR'></div>"
						+"<span>"+'\u0044\u0065\u0063\u006f\u0064\u0069\u0066\u0069\u0063\u0061\u0064\u006f\u0072\u0020\u0050\u0056\u0052'+'</span>'
						+'<a href="'+myContextPathURL+'/img/decoTV/decoHDDescription.png" target="_blank">'+'\u004d\u0026\u0061\u0061\u0063\u0075\u0074\u0065\u003b\u0073\u0020\u0069\u006e\u0066\u006f\u0020\u0061\u0071\u0075\u00ed\u002e\u002e\u002e'+'</a>'
//						+"<select id='decoHdPvr'>"
//							+"<option value='0'>"+'\u0053\u0065\u006c\u0065\u0063\u0063\u0069\u006f\u006e\u0061\u0020\u006e\u0026\u0075\u0061\u0063\u0075\u0074\u0065\u003b\u006d\u0065\u0072\u006f\u0020\u0064\u0065\u0063\u006f\u0064\u0069\u0066\u0069\u0063\u0061\u0064\u006f\u0072\u0065\u0073'+"</option>"
//							+"<option value='1'>"+1+"</option>"
//							+"<option value='2'>"+2+"</option>"
//							+"<option value='3'>"+3+"</option>"
//						+"</select>"
					+"</div>";
	}
	$("#planesTvDecos").append( myOption );
	seteaPaso('planesTvDecos');

	displayValue(divipolaSelected, estratoSelected, productoSelected, planVozSelected, planInternetSelected, planTvSelected, planTvHdSelected, listDecos, '' );

	jQuery('div.planTVDeco').children('select').change(function() {
		
		var numDecoEstandar = $('select#decoEstandar').val();
		var numDecoHd = $('select#decoHd').val();
		if (numDecoHd == undefined) {
			numDecoHd = 0;
		}
		var numDecoHdPvr = $('select#decoHdPvr').val();
		if (numDecoHdPvr == undefined) {
			numDecoHdPvr = 0;
		}
		var numDecosSelected = parseInt(numDecoEstandar) + parseInt(numDecoHd) + parseInt(numDecoHdPvr);
//		if (numDecosSelected == 0) {
//			alert( '\u0044\u0065\u0062\u0065\u0020\u0073\u0065\u006c\u0065\u0063\u0063\u0069\u006f\u006e\u0061\u0072\u002c\u0020\u0061\u006c\u0020\u006d\u0065\u006e\u006f\u0073\u002c\u0020\u0031\u0020\u0064\u0065\u0063\u006f\u0064\u0069\u0066\u0069\u0063\u0061\u0064\u006f\u0072' );
//			borramosCarrito();
//		} else
				if (numDecosSelected > 3) {
			alert( '\u0053\u006f\u006c\u006f\u0020\u0073\u0065\u0020\u0070\u0075\u0065\u0064\u0065\u006e\u0020\u0073\u0065\u006c\u0065\u0063\u0063\u0069\u006f\u006e\u0061\u0072\u0020\u0033\u0020\u0064\u0065\u0063\u006f\u0064\u0069\u0066\u0069\u0063\u0061\u0064\u006f\u0072\u0065\u0073\u0020\u0061\u0064\u0069\u0063\u0069\u006f\u006e\u0061\u006c\u0065\u0073\u0020\u0063\u006f\u006d\u006f\u0020\u006d\u00e1\u0078\u0069\u006d\u006f' );
			borramosCarrito();

		} else {
			// remove all decos
			listDecos = [];
			if (divipolaSelected == ID_CIUDAD_SANANDRES) {
				listDecos.push( '\u0044\u0065\u0063\u006f\u0064\u0069\u0066\u0069\u0063\u0061\u0064\u006f\u0072\u0020\u0045\u0073\u0074\u0061\u006e\u0064\u0061\u0072' );	// deco estandar por defecto
			} else {
				listDecos.push( '\u0044\u0065\u0063\u006f\u0064\u0069\u0066\u0069\u0063\u0061\u0064\u006f\u0072\u0020\u0048\u0044' );	// deco HD por defecto
			}

			// add deco
			for (i=0; i<numDecoHd; i++) {
				listDecos.push( '\u0044\u0065\u0063\u006f\u0064\u0069\u0066\u0069\u0063\u0061\u0064\u006f\u0072\u0020\u0048\u0044' );
			}
			for (i=0; i<numDecoHdPvr; i++) {
				listDecos.push( '\u0044\u0065\u0063\u006f\u0064\u0069\u0066\u0069\u0063\u0061\u0064\u006f\u0072\u0020\u0050\u0056\u0052' );
			}
			for (i=0; i<numDecoEstandar; i++) {
				listDecos.push( '\u0044\u0065\u0063\u006f\u0064\u0069\u0066\u0069\u0063\u0061\u0064\u006f\u0072\u0020\u0045\u0073\u0074\u0061\u006e\u0064\u0061\u0072' );
			}
			displayValue(divipolaSelected, estratoSelected, productoSelected, planVozSelected, planInternetSelected, planTvSelected, planTvHdSelected, listDecos, '' );

			
			setTimeout(function () {
				// your code to be executed after delay (miliseconds)
				$("#botonSiguiente").hide();
				$("#tabs").hide();
			}, 300);
		}
	});
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function displayValue(divipolaSelected, estratoSelected, productoSelected, planVozSelected, planInternetSelected, planTvSelected, planTvHdSelected, listDecos, planMovGoSelected) {
	//console.log("displayValue( "+divipolaSelected+", "+estratoSelected+", "+productoSelected+", "+planVozSelected+", "+planInternetSelected+", "+planTvSelected+", "+planTvHdSelected+", ["+listDecos.join(",")+"], "+planMovGoSelected+" )");

	// obtenemos la pestana seleccionada
	var idDivCotizacionSeleccionada = obtenCotizacionSeleccionada();

	var flagCotiz = 1;
	if (idDivCotizacionSeleccionada == 'cotizacion2') {
		flagCotiz = 2;
	}
	$('#divipolaSelected_'+flagCotiz).val( divipolaSelected );
	$('#estratoSelected_'+flagCotiz).val( estratoSelected );
	$('#productoSelected_'+flagCotiz).val( productoSelected );
	$('#planVozSelected_'+flagCotiz).val( planVozSelected );
	$('#planInternetSelected_'+flagCotiz).val( planInternetSelected );
	$('#planTvSelected_'+flagCotiz).val( planTvSelected );
	$('#planTvHdSelected_'+flagCotiz).val( planTvHdSelected );
	$('#listDecos_'+flagCotiz).val( listDecos );
	$('#planMovGoSelected_'+flagCotiz).val( planMovGoSelected );
	$('#planMovVideoSelected_'+flagCotiz).val( $('#tipomx-movvideo:checked').length );

	jQuery.ajax({
		type : "post",
		url : myResourceURL,
		dataType : 'json',
		data : {
			'accion' : 'loadValue',
			'ciudad' : divipolaSelected,
			'estrato' : estratoSelected,
			'producto' : productoSelected,
			'planLB' : planVozSelected,
			'planBA' : planInternetSelected,
			'planTV' : planTvSelected,
			'planTvHd' : planTvHdSelected,
			'listDecos' :	listDecos.join(","),
			'planMovGo' : planMovGoSelected,
			'movVideo' : $('#tipomx-movvideo:checked').length
		},
		success : function(data) {
			var flagMovVideoSolo, flagTV = false;
			$("#"+idDivCotizacionSeleccionada).empty();
			var myOption = "";
			for (k=0; k<data.length; k++) {
				if ('' == productoSelected) {

					// MovVideo solo

					myOption += "<div class='bloqueCarrito'>";
					myOption +=		"<div class='previosPuedenVariar'>"+'\u002a\u0020\u004c\u006f\u0073\u0020\u0076\u0061\u006c\u006f\u0072\u0065\u0073\u0020\u0072\u0065\u0073\u0075\u006c\u0074\u0061\u006e\u0074\u0065\u0073\u0020\u0064\u0065\u0020\u0065\u0073\u0074\u0061\u0020\u0063\u006f\u0074\u0069\u007a\u0061\u0063\u0069\u00f3\u006e\u002c\u0020\u0073\u006f\u006e\u0020\u0069\u006e\u0066\u006f\u0072\u006d\u0061\u0074\u0069\u0076\u006f\u0073\u002c\u0020\u0061\u0070\u0072\u006f\u0078\u0069\u006d\u0061\u0064\u006f\u0073\u0020\u0079\u0020\u0070\u0075\u0065\u0064\u0065\u006e\u0020\u0076\u0061\u0072\u0069\u0061\u0072\u002e'+"</div>";
					myOption +=		"<div class='instalacionDecoGratis'></div>";
					myOption += 	"<h3>"+'\u0053\u0065\u0072\u0076\u0069\u0063\u0069\u006f\u0073'+"</h3>";
					myOption += 	"<div>";
					myOption += 		"<div class='linea'>";
					myOption += 			"<div class='descrip'>"+data[k].tipoMXmovvideo+"</div>";
					myOption +=				"<div class='precio'>$"+data[k].valorMovvideo+"</div>";
					myOption += 		"</div>";
					var precioTotalParcial = parseInt(data[k].valorMovvideo);
					myOption += 		"<div class='linea'>";
					myOption += 			"<div class='precioTotalParcial'>"+'\u0054\u006f\u0074\u0061\u006c'+"</div>";
					myOption +=				"<div class='precio'>$"+precioTotalParcial+"</div>";
					myOption += 		"</div>";
					myOption += 	"</div>";
					myOption += "</div>";
					myOption += "<div class='bloqueCarrito'>";
					myOption += 	"<h3>"+'\u0053\u0065\u0072\u0076\u0069\u0063\u0069\u006f\u0073\u0020\u0061\u0064\u0069\u0063\u0069\u006f\u006e\u0061\u006c\u0065\u0073'+"</h3>";
					myOption += 	"<div>";
					myOption += 	"</div>";
					myOption += "</div>";
					myOption += "<div class='bloqueCarrito'>";
					myOption += 	"<div>";
					myOption +=			"<span>"+'\u0054\u006f\u0074\u0061\u006c'+"</span>";
					myOption += 		"<div class='precioTotal'>$"+data[k].total+"</div>";
					myOption += 	"</div>";
					myOption += "</div>";
//					myOption += "<div class='bloqueCarrito'>";
//					myOption +=		"<div>";
//					myOption += 		"<div class='promoMovVideo'>"+data[k].promoMovVideo+"</div>";
//					myOption += 	"</div>";
//					myOption += "</div>";

					flagMovVideoSolo = true;

				} else {

					if ('\u004d\u004f\u0056\u0049\u0053\u0054\u0041\u0052\u0020\u0047\u004f' == productoSelected) {

						// MovGo

						myOption += "<div class='bloqueCarrito'>";
						myOption +=		"<div class='previosPuedenVariar'>"+'\u002a\u0020\u004c\u006f\u0073\u0020\u0076\u0061\u006c\u006f\u0072\u0065\u0073\u0020\u0072\u0065\u0073\u0075\u006c\u0074\u0061\u006e\u0074\u0065\u0073\u0020\u0064\u0065\u0020\u0065\u0073\u0074\u0061\u0020\u0063\u006f\u0074\u0069\u007a\u0061\u0063\u0069\u00f3\u006e\u002c\u0020\u0073\u006f\u006e\u0020\u0069\u006e\u0066\u006f\u0072\u006d\u0061\u0074\u0069\u0076\u006f\u0073\u002c\u0020\u0061\u0070\u0072\u006f\u0078\u0069\u006d\u0061\u0064\u006f\u0073\u0020\u0079\u0020\u0070\u0075\u0065\u0064\u0065\u006e\u0020\u0076\u0061\u0072\u0069\u0061\u0072\u002e'+"</div>";
						myOption +=		"<div class='instalacionDecoGratis'></div>";
						myOption += 	"<h3>"+'\u0053\u0065\u0072\u0076\u0069\u0063\u0069\u006f\u0073'+"</h3>";
						myOption += 	"<div>";
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='descrip'>"+data[k].tipoMX+"</div>";
						myOption +=				"<div class='precio'>$"+data[k].valorMovGoFull+"</div>";
						myOption += 		"</div>";
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='descrip'>"+data[k].tipoMXmovvideo+"</div>";
						myOption +=				"<div class='precio'>"+data[k].valorMovvideo+"</div>";
						myOption += 		"</div>";
						var precioTotalParcial = parseInt(data[k].valorMovGoFull) + ((data[k].valorMovvideo!="") ? parseInt((data[k].valorMovvideo).substring(1)) : parseInt(0));
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='precioTotalParcial'>"+'\u0054\u006f\u0074\u0061\u006c'+"</div>";
						myOption +=				"<div class='precio'>$"+precioTotalParcial+"</div>";
						myOption += 		"</div>";
						myOption += 	"</div>";
						myOption += "</div>";
						myOption += "<div class='bloqueCarrito'>";
						myOption += 	"<h3>"+'\u0053\u0065\u0072\u0076\u0069\u0063\u0069\u006f\u0073\u0020\u0061\u0064\u0069\u0063\u0069\u006f\u006e\u0061\u006c\u0065\u0073'+"</h3>";
						myOption += 	"<div>";
						myOption += 	"</div>";
						myOption += "</div>";
						myOption += "<div class='bloqueCarrito'>";
						myOption +=		"<div>";
						myOption +=			"<span>"+'\u0054\u006f\u0074\u0061\u006c'+"</span>";
						myOption += 		"<div class='precioTotal'>$"+data[k].total+"</div>";
						myOption += 	"</div>";
						myOption += "</div>";
						myOption += "<div class='bloqueCarrito'>";
						myOption +=		"<div>";
						myOption += 		"<div class='promoMovVideo'>"+data[k].promoMovVideo+"</div>";
						myOption += 	"</div>";
						myOption += "</div>";

					} else if ('\u0054\u0056\u0020\u0053\u004f\u004c\u0041' == productoSelected) {

						// tv solo

						myOption += "<div class='bloqueCarrito'>";
						myOption +=		"<div class='previosPuedenVariar'>"+'\u002a\u0020\u004c\u006f\u0073\u0020\u0076\u0061\u006c\u006f\u0072\u0065\u0073\u0020\u0072\u0065\u0073\u0075\u006c\u0074\u0061\u006e\u0074\u0065\u0073\u0020\u0064\u0065\u0020\u0065\u0073\u0074\u0061\u0020\u0063\u006f\u0074\u0069\u007a\u0061\u0063\u0069\u00f3\u006e\u002c\u0020\u0073\u006f\u006e\u0020\u0069\u006e\u0066\u006f\u0072\u006d\u0061\u0074\u0069\u0076\u006f\u0073\u002c\u0020\u0061\u0070\u0072\u006f\u0078\u0069\u006d\u0061\u0064\u006f\u0073\u0020\u0079\u0020\u0070\u0075\u0065\u0064\u0065\u006e\u0020\u0076\u0061\u0072\u0069\u0061\u0072\u002e'+"</div>";
						myOption +=		"<div class='instalacionDecoGratis'>"+data[k].instalacionDecoGratis+"</div>";
						myOption += 	"<h3>"+'\u0053\u0065\u0072\u0076\u0069\u0063\u0069\u006f\u0073'+"</h3>";
						myOption += 	"<div>";
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='descrip'>"+data[k].planTV+"</div>";
						myOption +=				"<div class='precio'>$"+data[k].valorTV+"</div>";
						myOption += 		"</div>";
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='descrip'>"+data[k].planInstTV+"</div>";
						myOption +=				"<div class='precio'>$"+data[k].valorInstTV+"</div>";
						myOption += 		"</div>";
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='descrip'>"+data[k].tipoMXmovvideo+"</div>";
						myOption +=				"<div class='precio'>"+data[k].valorMovvideo+"</div>";
						myOption += 		"</div>";
						var precioTotalParcial = parseInt(data[k].valorTV) + parseInt(data[k].valorInstTV) + ((data[k].valorMovvideo!="") ? parseInt((data[k].valorMovvideo).substring(1)) : parseInt(0));
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='precioTotalParcial'>"+'\u0054\u006f\u0074\u0061\u006c'+"</div>";
						myOption +=				"<div class='precio'>$"+precioTotalParcial+"</div>";
						myOption += 		"</div>";
						myOption += 	"</div>";
						myOption += "</div>";
						myOption += "<div class='bloqueCarrito'>";
						myOption += 	"<h3>"+'\u0053\u0065\u0072\u0076\u0069\u0063\u0069\u006f\u0073\u0020\u0061\u0064\u0069\u0063\u0069\u006f\u006e\u0061\u006c\u0065\u0073'+"</h3>";
						myOption += 	"<div>";
						if ("" != planTvHdSelected) {
							myOption += 	"<div class='linea'>";
							myOption += 		"<div class='descrip'>"+data[k].planTvHd+"</div>";
							myOption +=			"<div class='precio'>$"+data[k].valorTvHd+"</div>";
							myOption += 	"</div>";
						}
						var numDecos = Object.size( listDecos );
						for (i=1; i<=numDecos; i+=1) {
							var decoDescrip = eval("data[k].deco"+i);
							var decoPrecio = eval("data[k].valorDeco"+i);
							myOption += 	"<div class='linea'>";
							myOption += 		"<div class='descrip'>"+decoDescrip+"</div>";
							myOption +=			"<div class='precio'>$"+decoPrecio+"</div>";
							myOption += 	"</div>";
						}
						myOption += 	"</div>";
						myOption += "</div>";
						myOption += "<div class='bloqueCarrito'>";
						myOption += 	"<div>";
						myOption +=			"<span>"+'\u0054\u006f\u0074\u0061\u006c'+"</span>";
						myOption += 		"<div class='precioTotal'>$"+data[k].total+"</div>";
						//console.log("Precio Total: " + data[k].total);
						myOption +=			"<div class='labelSegundaMensualidad'>"+data[k].labelSegundaMensualidad+"</div>";
						myOption += 		"<div class='valorSegundaMensualidad'>"+data[k].valorSegundaMensualidad+"</div>";
						myOption +=		"</div>";
						myOption += "</div>";
//						myOption += "<div class='bloqueCarrito'>";
//						myOption += 	"<div>";
//						myOption += 		"<div class='promoMovVideo'>"+data[k].promoMovVideo+"</div>";
//						myOption +=		"</div>";
//						myOption += "</div>";

						flagTV = true;

					} else if ('\u004c\u0042\u0020\u0053\u004f\u004c\u0041' == productoSelected) {

						// voz solo

						myOption += "<div class='bloqueCarrito'>";
						myOption +=		"<div class='previosPuedenVariar'>"+'\u002a\u0020\u004c\u006f\u0073\u0020\u0076\u0061\u006c\u006f\u0072\u0065\u0073\u0020\u0072\u0065\u0073\u0075\u006c\u0074\u0061\u006e\u0074\u0065\u0073\u0020\u0064\u0065\u0020\u0065\u0073\u0074\u0061\u0020\u0063\u006f\u0074\u0069\u007a\u0061\u0063\u0069\u00f3\u006e\u002c\u0020\u0073\u006f\u006e\u0020\u0069\u006e\u0066\u006f\u0072\u006d\u0061\u0074\u0069\u0076\u006f\u0073\u002c\u0020\u0061\u0070\u0072\u006f\u0078\u0069\u006d\u0061\u0064\u006f\u0073\u0020\u0079\u0020\u0070\u0075\u0065\u0064\u0065\u006e\u0020\u0076\u0061\u0072\u0069\u0061\u0072\u002e'+"</div>";
						myOption +=		"<div class='instalacionDecoGratis'></div>";
						myOption += 	"<h3>"+'\u0053\u0065\u0072\u0076\u0069\u0063\u0069\u006f\u0073'+"</h3>";
						myOption += 	"<div>";
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='descrip'>"+data[k].planLB+"</div>";
						myOption +=				"<div class='precio'>$"+data[k].valorLB+"</div>";
						myOption += 		"</div>";
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='descrip'>"+data[k].tipoMXmovvideo+"</div>";
						myOption +=				"<div class='precio'>"+data[k].valorMovvideo+"</div>";
						myOption += 		"</div>";
						var precioTotalParcial = parseInt(data[k].valorLB) + ((data[k].valorMovvideo!="") ? parseInt((data[k].valorMovvideo).substring(1)) : parseInt(0));
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='precioTotalParcial'>"+'\u0054\u006f\u0074\u0061\u006c'+"</div>";
						myOption +=				"<div class='precio'>$"+precioTotalParcial+"</div>";
						myOption += 		"</div>";
						myOption += 	"</div>";
						myOption += "</div>";
						myOption += "<div class='bloqueCarrito'>";
						myOption += 	"<h3>"+'\u0053\u0065\u0072\u0076\u0069\u0063\u0069\u006f\u0073\u0020\u0061\u0064\u0069\u0063\u0069\u006f\u006e\u0061\u006c\u0065\u0073'+"</h3>";
						myOption += 	"<div>";
						myOption += 	"</div>";
						myOption += "</div>";
						myOption += "<div class='bloqueCarrito'>";
						myOption +=		"<div>";
						myOption +=			"<span>"+'\u0054\u006f\u0074\u0061\u006c'+"</span>";
						myOption += 		"<div class='precioTotal'>$"+data[k].total+"</div>";
						myOption +=		"</div>";
						myOption += "</div>";
						myOption += "<div class='bloqueCarrito'>";
//						myOption +=		"<div>";
//						myOption += 		"<div class='promoMovVideo'>"+data[k].promoMovVideo+"</div>";
//						myOption +=		"</div>";
//						myOption += "</div>";

					} else if ('\u0044\u0055\u004f\u0020\u0042\u0041' == productoSelected) {

						// voz + internet

						myOption += "<div class='bloqueCarrito'>";
						myOption +=		"<div class='previosPuedenVariar'>"+'\u002a\u0020\u004c\u006f\u0073\u0020\u0076\u0061\u006c\u006f\u0072\u0065\u0073\u0020\u0072\u0065\u0073\u0075\u006c\u0074\u0061\u006e\u0074\u0065\u0073\u0020\u0064\u0065\u0020\u0065\u0073\u0074\u0061\u0020\u0063\u006f\u0074\u0069\u007a\u0061\u0063\u0069\u00f3\u006e\u002c\u0020\u0073\u006f\u006e\u0020\u0069\u006e\u0066\u006f\u0072\u006d\u0061\u0074\u0069\u0076\u006f\u0073\u002c\u0020\u0061\u0070\u0072\u006f\u0078\u0069\u006d\u0061\u0064\u006f\u0073\u0020\u0079\u0020\u0070\u0075\u0065\u0064\u0065\u006e\u0020\u0076\u0061\u0072\u0069\u0061\u0072\u002e'+"</div>";
						myOption +=		"<div class='instalacionDecoGratis'></div>";
						myOption += 	"<h3>"+'\u0053\u0065\u0072\u0076\u0069\u0063\u0069\u006f\u0073'+"</h3>";
						myOption += 	"<div>";
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='descrip'>"+data[k].planLB+"</div>";
						myOption +=				"<div class='precio'>$"+data[k].valorLB+"</div>";
						myOption += 		"</div>";
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='descrip'>"+data[k].planBA+"</div>";
						myOption +=				"<div class='precio'>$"+data[k].valorBA+"</div>";
						myOption += 		"</div>";
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='descrip'>"+data[k].tipoMXmovvideo+"</div>";
						myOption +=				"<div class='precio'>"+data[k].valorMovvideo+"</div>";
						myOption += 		"</div>";
						var precioTotalParcial = parseInt(data[k].valorLB) + parseInt(data[k].valorBA) + ((data[k].valorMovvideo!="") ? parseInt((data[k].valorMovvideo).substring(1)) : parseInt(0));
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='precioTotalParcial'>"+'\u0054\u006f\u0074\u0061\u006c'+"</div>";
						myOption +=				"<div class='precio'>$"+precioTotalParcial+"</div>";
						myOption += 		"</div>";
						myOption += 	"</div>";
						myOption += "</div>";
						myOption += "<div class='bloqueCarrito'>";
						myOption += 	"<h3>"+'\u0053\u0065\u0072\u0076\u0069\u0063\u0069\u006f\u0073\u0020\u0061\u0064\u0069\u0063\u0069\u006f\u006e\u0061\u006c\u0065\u0073'+"</h3>";
						myOption += 	"<div>";
						myOption += 	"</div>";
						myOption += "</div>";
						myOption += "<div class='bloqueCarrito'>";
						myOption +=		"<div>";
						myOption +=			"<span>"+'\u0054\u006f\u0074\u0061\u006c'+"</span>";
						myOption += 		"<div class='precioTotal'>$"+data[k].total+"</div>";
						myOption +=		"</div>";
						myOption += "</div>";
						myOption += "<div class='bloqueCarrito'>";
//						myOption +=		"<div>";
//						myOption += 		"<div class='promoMovVideo'>"+data[k].promoMovVideo+"</div>";
//						myOption +=		"</div>";
//						myOption += "</div>";

					} else if ('\u0044\u0055\u004f\u0020\u0054\u0056' == productoSelected) {

						// voz + tv

						myOption += "<div class='bloqueCarrito'>";
						myOption +=		"<div class='previosPuedenVariar'>"+'\u002a\u0020\u004c\u006f\u0073\u0020\u0076\u0061\u006c\u006f\u0072\u0065\u0073\u0020\u0072\u0065\u0073\u0075\u006c\u0074\u0061\u006e\u0074\u0065\u0073\u0020\u0064\u0065\u0020\u0065\u0073\u0074\u0061\u0020\u0063\u006f\u0074\u0069\u007a\u0061\u0063\u0069\u00f3\u006e\u002c\u0020\u0073\u006f\u006e\u0020\u0069\u006e\u0066\u006f\u0072\u006d\u0061\u0074\u0069\u0076\u006f\u0073\u002c\u0020\u0061\u0070\u0072\u006f\u0078\u0069\u006d\u0061\u0064\u006f\u0073\u0020\u0079\u0020\u0070\u0075\u0065\u0064\u0065\u006e\u0020\u0076\u0061\u0072\u0069\u0061\u0072\u002e'+"</div>";
						myOption +=		"<div class='instalacionDecoGratis'>"+data[k].instalacionDecoGratis+"</div>";
						myOption += 	"<h3>"+'\u0053\u0065\u0072\u0076\u0069\u0063\u0069\u006f\u0073'+"</h3>";
						myOption += 	"<div>";
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='descrip'>"+data[k].planLB+"</div>";
						myOption +=				"<div class='precio'>$"+data[k].valorLB+"</div>";
						myOption += 		"</div>";
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='descrip'>"+data[k].planTV+"</div>";
						myOption +=				"<div class='precio'>$"+data[k].valorTV+"</div>";
						myOption += 		"</div>";
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='descrip'>"+data[k].tipoMXmovvideo+"</div>";
						myOption +=				"<div class='precio'>"+data[k].valorMovvideo+"</div>";
						myOption += 		"</div>";
						var precioTotalParcial = parseInt(data[k].valorLB) + parseInt(data[k].valorTV) + ((data[k].valorMovvideo!="") ? parseInt((data[k].valorMovvideo).substring(1)) : parseInt(0));
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='precioTotalParcial'>"+'\u0054\u006f\u0074\u0061\u006c'+"</div>";
						myOption +=				"<div class='precio'>$"+precioTotalParcial+"</div>";
						myOption += 		"</div>";
						myOption += 	"</div>";
						myOption += "</div>";
						myOption += "<div class='bloqueCarrito'>";
						myOption += 	"<h3>"+'\u0053\u0065\u0072\u0076\u0069\u0063\u0069\u006f\u0073\u0020\u0061\u0064\u0069\u0063\u0069\u006f\u006e\u0061\u006c\u0065\u0073'+"</h3>";
						myOption += 	"<div>";
						if ("" != planTvHdSelected) {
							myOption += 	"<div class='linea'>";
							myOption += 		"<div class='descrip'>"+data[k].planTvHd+"</div>";
							myOption +=			"<div class='precio'>$"+data[k].valorTvHd+"</div>";
							myOption += 	"</div>";
						}
						var numDecos = Object.size( listDecos );
						for (i=1; i<=numDecos; i+=1) {
							var decoDescrip = eval("data[k].deco"+i);
							var decoPrecio = eval("data[k].valorDeco"+i);
							myOption += 	"<div class='linea'>";
							myOption += 		"<div class='descrip'>"+decoDescrip+"</div>";
							myOption +=			"<div class='precio'>$"+decoPrecio+"</div>";
							myOption += 	"</div>";
						}
						myOption += 	"</div>";
						myOption += "</div>";
						myOption += "<div class='bloqueCarrito'>";
						myOption +=		"<div>";
						myOption +=			"<span>"+'\u0054\u006f\u0074\u0061\u006c'+"</span>";
						myOption += 		"<div class='precioTotal'>$"+data[k].total+"</div>";
						myOption +=			"<div class='labelSegundaMensualidad'>"+data[k].labelSegundaMensualidad+"</div>";
						myOption += 		"<div class='valorSegundaMensualidad'>"+data[k].valorSegundaMensualidad+"</div>";
						myOption +=		"</div>";
						myOption += "</div>";
						myOption += "<div class='bloqueCarrito'>";
//						myOption += 	"<div>";
//						myOption += 		"<div class='promoMovVideo'>"+data[k].promoMovVideo+"</div>";
//						myOption +=		"</div>";
//						myOption += "</div>";

						flagTV = true;

					} else if ('\u0054\u0052\u0049\u004f' == productoSelected) {

						// voz + internet + tv

						myOption += "<div class='bloqueCarrito'>";
						myOption +=		"<div class='previosPuedenVariar'>"+'\u002a\u0020\u004c\u006f\u0073\u0020\u0076\u0061\u006c\u006f\u0072\u0065\u0073\u0020\u0072\u0065\u0073\u0075\u006c\u0074\u0061\u006e\u0074\u0065\u0073\u0020\u0064\u0065\u0020\u0065\u0073\u0074\u0061\u0020\u0063\u006f\u0074\u0069\u007a\u0061\u0063\u0069\u00f3\u006e\u002c\u0020\u0073\u006f\u006e\u0020\u0069\u006e\u0066\u006f\u0072\u006d\u0061\u0074\u0069\u0076\u006f\u0073\u002c\u0020\u0061\u0070\u0072\u006f\u0078\u0069\u006d\u0061\u0064\u006f\u0073\u0020\u0079\u0020\u0070\u0075\u0065\u0064\u0065\u006e\u0020\u0076\u0061\u0072\u0069\u0061\u0072\u002e'+"</div>";
						myOption +=		"<div class='instalacionDecoGratis'>"+data[k].instalacionDecoGratis+"</div>";
						myOption += 	"<h3>"+'\u0053\u0065\u0072\u0076\u0069\u0063\u0069\u006f\u0073'+"</h3>";
						myOption += 	"<div>";
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='descrip'>"+data[k].planLB+"</div>";
						myOption +=				"<div class='precio'>$"+data[k].valorLB+"</div>";
						myOption += 		"</div>";
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='descrip'>"+data[k].planBA+"</div>";
						myOption +=				"<div class='precio'>$"+data[k].valorBA+"</div>";
						myOption += 		"</div>";
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='descrip'>"+data[k].planTV+"</div>";
						myOption +=				"<div class='precio'>$"+data[k].valorTV+"</div>";
						myOption += 		"</div>";
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='descrip'>"+data[k].tipoMXmovvideo+"</div>";
						myOption +=				"<div class='precio'>"+data[k].valorMovvideo+"</div>";
						myOption += 		"</div>";
						var precioTotalParcial = parseInt(data[k].valorLB) + parseInt(data[k].valorBA) + parseInt(data[k].valorTV) + ((data[k].valorMovvideo!="") ? parseInt((data[k].valorMovvideo).substring(1)) : parseInt(0));
						myOption += 		"<div class='linea'>";
						myOption += 			"<div class='precioTotalParcial'>"+'\u0054\u006f\u0074\u0061\u006c'+"</div>";
						myOption +=				"<div class='precio'>$"+precioTotalParcial+"</div>";
						myOption += 		"</div>";
						myOption += 	"</div>";
						myOption += "</div>";
						myOption += "<div class='bloqueCarrito'>";
						myOption += 	"<h3>"+'\u0053\u0065\u0072\u0076\u0069\u0063\u0069\u006f\u0073\u0020\u0061\u0064\u0069\u0063\u0069\u006f\u006e\u0061\u006c\u0065\u0073'+"</h3>";
						myOption += 	"<div>";
						if ("" != planTvHdSelected) {
							myOption += 	"<div class='linea'>";
							myOption += 		"<div class='descrip'>"+data[k].planTvHd+"</div>";
							myOption +=			"<div class='precio'>$"+data[k].valorTvHd+"</div>";
							myOption += 	"</div>";
						}
						var numDecos = Object.size( listDecos );
						for (i=1; i<=numDecos; i+=1) {
							var decoDescrip = eval("data[k].deco"+i);
							var decoPrecio = eval("data[k].valorDeco"+i);
							myOption += 	"<div class='linea'>";
							myOption += 		"<div class='descrip'>"+decoDescrip+"</div>";
							myOption +=			"<div class='precio'>$"+decoPrecio+"</div>";
							myOption += 	"</div>";
						}
						myOption += 	"</div>";
						myOption += "</div>";
						myOption += "<div class='bloqueCarrito'>";
						myOption +=		"<div>";
						myOption +=			"<span>"+'\u0054\u006f\u0074\u0061\u006c'+"</span>";
						myOption += 		"<div class='precioTotal'>$"+data[k].total+"</div>";
						myOption +=			"<div class='labelSegundaMensualidad'>"+data[k].labelSegundaMensualidad+"</div>";
						myOption +=			"<div class='valorSegundaMensualidad'>"+data[k].valorSegundaMensualidad+"</div>";
						myOption +=		"</div>";
						myOption += "</div>";
						myOption += "<div class='bloqueCarrito'>";
//						myOption +=		"<div>";
//						myOption += 		"<div class='promoMovVideo'>"+data[k].promoMovVideo+"</div>";
//						myOption +=		"</div>";
//						myOption += "</div>";

						flagTV = true;
					}

				}
				$('#total_'+flagCotiz).val( data[k].total );
				$('#total2mes_'+flagCotiz).val( (data[k].valorSegundaMensualidad!=undefined) ? data[k].valorSegundaMensualidad : '' );
			}
			$("#"+idDivCotizacionSeleccionada).append( myOption );

			$("#tabs").show();

			if (flagMovVideoSolo || flagTV) {
				$("#botonSiguiente").show();
			} else {
				$("#botonSiguiente").hide();
			}

			compararCotizaciones();
			// si la pestana seleccionada es la 1, mostramos el botón de comparar una 2ª cotizacion
			// si la pestana seleccionada es la 2, mostramos el botón de comparar ambas cotizaciones
			if ("cotizacion1" == idDivCotizacionSeleccionada) {
				$("#botonEnviarSolicitud1").show();
				$('#botonCotizacion2').show();
				$('#botonAmpliarCotizaciones').hide();
			} else {
				$("#botonEnviarSolicitud2").show();
				$('#botonCotizacion2').hide();
				$('#botonAmpliarCotizaciones').show();
			}
		},
		complete: function(){
			//console.log("COMPLETE DISPLAY");
			blockScreen.hide();
		}
	});
}

function obtenCotizacionSeleccionada() {
	var idDivCotizacionSeleccionada;
	var active = $("#tabs").tabs("option", "active");
	if (active == 0) {
		idDivCotizacionSeleccionada = "cotizacion1";
	} else if (active == 1) {
		idDivCotizacionSeleccionada = "cotizacion2";
	}
	return idDivCotizacionSeleccionada;
}

function initCotizacion() {
	initCombos(3);

	seteaPaso('');
	siguientePaso(true);

	loadDeparts();

	showElements.init();
	paddingMaker.init();
}

function initCotizacion2() {
	// habilitamos y seleccionamos la 2ª pestana
	$("#tabs").tabs( "enable", 1 );
	$("#tabs").tabs( "option", "active", 1 );
	// inicializamos el resto
	initCotizacion();
	// ocultamos botón de comparar una 2ª cotizacion
	$('#botonCotizacion2').hide();
	// ocultamos botón de comparar ambas cotizaciones
	$('#botonAmpliarCotizaciones').hide();
	// ocultamos botón de enviar solicitud
	$('#botonEnviarSolicitud2').hide();
	// llamamos a la función que quita el borde del bloque
	showElements.init();
	paddingMaker.init();
	$(".miga").hide();
	$("#divCombos").show();
}

function borramosCarrito() {
	// borramos precios
	var idDivCotizacionSeleccionada = obtenCotizacionSeleccionada();
	$("#"+idDivCotizacionSeleccionada).empty();
	// ocultamos botón de comparar una 2ª cotizacion
	$('#botonCotizacion2').hide();
	// ocultamos botón de comparar ambas cotizaciones
	$('#botonAmpliarCotizaciones').hide();
	// ocultamos botón de enviar solicitud
	if ("cotizacion1" == idDivCotizacionSeleccionada) {
		$('#botonEnviarSolicitud1').hide();
	} else {
		$('#botonEnviarSolicitud2').hide();
	}
}

function solicitarCotizacion() {
	$('#divCombos').hide();
	$('#divPasos').hide();
	$('#tabs').hide();
	$('#divSolicitud').show();

	globalPageNameDataLayer = dataLayer_formularioCotizador(globalPageNameDataLayer);
}

function enviarCotizacion() {
	var idDivCotizacionSeleccionada = obtenCotizacionSeleccionada();
	var flagCotiz = 1;
	if (idDivCotizacionSeleccionada == 'cotizacion2') {
		flagCotiz = 2;
	}

	jQuery.ajax({
		type : "post",
		url : myResourceURL,
		dataType : 'json',
		data : {
			'accion' : 'enviarCotizacion',
			'nombre' : $('#nombre').val(),
			'apellidos' : $('#apellidos').val(),
			'tipoDeDocumento' : $('#tipoDeDocumento').val(),
			'numeroDeDocumento' : $('#numeroDeDocumento').val(),
			'direccion' : $('#direccion').val(),
			'barrio' : $('#barrio').val(),
			'email' : $('#email').val(),
			'telefono' : $('#telefono').val(),
			'movil' : $('#movil').val(),
			'sendEmail' : $('#sendEmail:checked').length,
			'ciudad' : $('#divipolaSelected_'+flagCotiz).val(),
			'estrato' : $('#estratoSelected_'+flagCotiz).val(),
			'producto' : $('#productoSelected_'+flagCotiz).val(),
			'planLB' : $('#planVozSelected_'+flagCotiz).val(),
			'planBA' : $('#planInternetSelected_'+flagCotiz).val(),
			'planTV' : $('#planTvSelected_'+flagCotiz).val(),
			'planTvHd' : $('#planTvHdSelected_'+flagCotiz).val(),
			'listDecos' : $('#listDecos_'+flagCotiz).val(),
			'planMovGo' : $('#planMovGoSelected_'+flagCotiz).val(),
			'movVideo' : $('#planMovVideoSelected_'+flagCotiz).val(),
			'total' : $('#total_'+flagCotiz).val(),
			'total2mes' : $('#total2mes_'+flagCotiz).val()
		},
		success : function(data) {
			$('#divSolicitud').hide();
			$('#divResultSolicitud').show();
			$('#divResultSolicitud').html( "<h1>"+'\u00a1\u0047\u0072\u0061\u0063\u0069\u0061\u0073\u0021\u0020\u0052\u0065\u0063\u0069\u0062\u0069\u006d\u006f\u0073\u0020\u0074\u0075\u0073\u0020\u0064\u0061\u0074\u006f\u0073'+"</h1>" + "<span>" +data.estado + "</span>" );
			$('#divResultSolicitud').append("<a href='#' onclick='javascript:location.reload();'>"+'\u0052\u0065\u0067\u0072\u0065\u0073\u0061\u0072\u0020\u0061\u006c\u0020\u0063\u006f\u0074\u0069\u007a\u0061\u0064\u006f\u0072'+"</a>");
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$('#divSolicitud').hide();
			$('#divResultSolicitud').show();
			$('#divResultSolicitud').html( "<h1>"+'\u004e\u006f\u0020\u0073\u0065\u0020\u0068\u0061\u0020\u0070\u006f\u0064\u0069\u0064\u006f\u0020\u0070\u0072\u006f\u0063\u0065\u0073\u0061\u0072\u0020\u0073\u0075\u0020\u0073\u006f\u006c\u0069\u0063\u0069\u0074\u0075\u0064\u002e\u0020\u0049\u006e\u0074\u00e9\u006e\u0074\u0065\u006c\u006f\u0020\u0064\u0065\u0020\u006e\u0075\u0065\u0076\u006f\u002e'+"</h1>");
			$('#divResultSolicitud').append("<a href='#' onclick='javascript:location.reload();'>"+'\u0052\u0065\u0067\u0072\u0065\u0073\u0061\u0072\u0020\u0061\u006c\u0020\u0063\u006f\u0074\u0069\u007a\u0061\u0064\u006f\u0072'+"</a>");
		}
	});

}

var ampliarCotizaciones = function () {

		var srcImg = myContextPathURL +"/img/downArrow.png";

	$('#ampliarCotizacionesModal').show();
	// botón cerrar ventana modal
	$('#ampliarCotizacionesModal').html('<button id="botonCerrarAmpliarCotizacionesModal" type="button" class="btn btn-default icon-remove-sign" data-dismiss="modal"></button>');
	// título ventana
	$('#ampliarCotizacionesModal').append('<h1>'+'\u0045\u0073\u0074\u0061\u0073\u0020\u0073\u006f\u006e\u0020\u0074\u0075\u0073\u0020\u006f\u0070\u0063\u0069\u006f\u006e\u0065\u0073\u0020\u0064\u0065\u0020\u0063\u006f\u0074\u0069\u007a\u0061\u0063\u0069\u0026\u006f\u0061\u0063\u0075\u0074\u0065\u003b\u006e'+'</h1>');
	// cogemos todo el html de la pestaña1, y lo copiamos
	$('#ampliarCotizacionesModal').append('<div>'
											+'<span>'+'\u0043\u006f\u0074\u0069\u007a\u0061\u0063\u0069\u0026\u006f\u0061\u0063\u0075\u0074\u0065\u003b\u006e\u0020\u0031'+'</span>'
											+'<img src='+ srcImg +'>'
											+$('#cotizacion1').html()
											+'<div><input type="radio" name="cotizacionAmpliada" value="1" />'+'\u0041\u0063\u0065\u0070\u0074\u006f\u0020\u0065\u0073\u0074\u0061\u0020\u0063\u006f\u0074\u0069\u007a\u0061\u0063\u0069\u00f3\u006e'+'</div>'
										+'</div>');
	// cogemos todo el html de la pestaña2, y lo copiamos
	$('#ampliarCotizacionesModal').append('<div>'
											+'<span>'+'\u0043\u006f\u0074\u0069\u007a\u0061\u0063\u0069\u0026\u006f\u0061\u0063\u0075\u0074\u0065\u003b\u006e\u0020\u0032'+'</span>'
											+'<img src='+ srcImg +'>'
											+$('#cotizacion2').html()
											+'<div><input type="radio" name="cotizacionAmpliada" value="2" />'+'\u0041\u0063\u0065\u0070\u0074\u006f\u0020\u0065\u0073\u0074\u0061\u0020\u0063\u006f\u0074\u0069\u007a\u0061\u0063\u0069\u00f3\u006e'+'</div>'
										+'</div>');
	// botón enviar cotización
	$('#ampliarCotizacionesModal').append('<button type="button" class="btn btn-default" onclick="seleccionaCotizacionAmpliada()">'+'\u0045\u006e\u0076\u0069\u0061\u0072'+'</button>');
}

function seleccionaCotizacionAmpliada() {
	// seleccionamos la cotización marcada
	$('a[href=#tabs-1]').click();
	if ($('input[name=cotizacionAmpliada]').val() == "2") {
		$('a[href=#tabs-2]').click();
	}
	// click en el botón de cerrar la ventana modal
	$('#botonCerrarAmpliarCotizacionesModal').click();
	// mostramos el formulario de solicitud
	solicitarCotizacion();
}

//caso especial para el botón siguente cuando no seleciona ningun planTv HD
function pasoSigPlanTvBasico(adelante){
	//comprobamos si el plan basico esta seleccionado.
	var isPlanTvBasicoChecked = $('#planTvBasico').is(":checked");
	if(adelante && isPlanTvBasicoChecked && $("#breadcrumb_planesTvHd").hasClass("active")){
			loadDecos(divipolaSelectedTvBasico, estratoSelectedTvBasico, productoSelectedTvBasico, planVozSelectedTvBasico, planInternetSelectedTvBasico, planTvSelectedTvBasico, "", "");
			globalPageNameDataLayer = dataLayer_seleccionaTvHD(globalPageNameDataLayer,"");
	}
}

function pasoSigPlanVozSpecial(adelante){
	if(adelante){
		selectPlanVoz(divipolaSelectedVozSolo, estratoSelectedVozSolo, productoSelectedVozSolo , planVozSelectedVozSolo);
	}
}

var compararCotizaciones = function () {
	if($("#botonAtras").css("display")== "none"){
		$("#botonAmpliarCotizaciones").css('float', 'left');
	}
	else if($("#botonSiguiente").css("display")== "none"){
		$("#botonAmpliarCotizaciones").css('float', 'right');
	}
}

//objeto creado para poder controlar la capa de bloqueo
var blockScreen = {
	  show: function (){
		  $(".blockScreen").show();
	  },
	  hide: function(){
		  $(".blockScreen").css('display', 'none');
	  }
};

//controlamos el compportamiento en el momento de la confirmacion del mail
$("#email").blur(function (){
	mailConfirmation();
});

function mailConfirmation(){
	if($("#email").val() != ""){
		$(".confirMail").show();
	}else{
		$("conf_email").val("");
		$(".confirMail").hide();
	}
};


//función para ocultar las select de departamentos

if ( $("#divPasos").is(":visible") ){
	$("#divCombos").hide();
}