<%@ include file="/html/init.jsp"%>
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/themes/smoothness/jquery-ui.css">
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
<input type="hidden" id="resourceURL" name="resourceURL" value="<portlet:resourceURL />" />
<input type="hidden" id="contextPathURL" name="contextPathURL" value="<%=request.getContextPath()%>" />
<div class="content_mid">
	<%--Div creado para sel utilizado como capa de blqueo del doble click en las cajas --%>
	<div class="blockScreen" style="display: none;"></div>
	<div id="divCombos" class="contenido_paso">
		<h3 class="tit"><liferay-ui:message key="titleInit" /></h3>
		<div class="datosDepartamento">
			<label for="deptos"><liferay-ui:message key="comboDeptos" /></label>
			<select disabled="disabled" id="deptos"></select>
		</div>
		<div class="cargaCiudades">
			<label for="ciudades"><liferay-ui:message key="comboCiudades" /></label>
			<select disabled="disabled" id="ciudades"></select>
		</div>
		<div class="datosEstrato">
			<label for="estratos"><liferay-ui:message key="comboEstratos" /></label>
			<select disabled="disabled" id="estratos"></select>
		</div>
		<div class="initButton">
			<input type="button" id="botonInit" class="btn" style="display: none;" value="<liferay-ui:message key='botonInit' />" onclick="dataLayer_botonBorrar(); javascript:location.reload();" />
		</div>
	</div>
	<div id="divPasos" class="span7 xs-span-12" style="display: none;">
		<div>
			<div id="breadcrumb_productos"><liferay-ui:message key='breadcrumb_productos' /></div>
			<div id="breadcrumb_planesVoz"><liferay-ui:message key='breadcrumb_planesVoz' /></div>
			<div id="breadcrumb_planesInternet"><liferay-ui:message key='breadcrumb_planesInternet' /></div>
			<div id="breadcrumb_planesTv"><liferay-ui:message key='breadcrumb_planesTv' /></div>
			<div id="breadcrumb_planesTvHd"><liferay-ui:message key='breadcrumb_planesTvHd' /></div>
			<div id="breadcrumb_planesTvDecos"><liferay-ui:message key='breadcrumb_planesTvDecos' /></div>
		</div>
		<div class="miga">
			<ul>
				<li class="paso1">Paso 1</li>
				<li class="paso2">Paso 2</li>
				<li class="paso3">Paso 3</li>
				<li class="paso4">Paso 4</li>
				<li class="paso5">Paso 5</li>
				<li class="paso6">Paso 6</li>
			</ul>
		</div>
		<div id="productos"></div>
		<div id="planesVoz"></div>
		<div id="planesInternet"></div>
		<div id="planesTv"></div>
		<div id="planesTvHd"></div>
		<div id="planesTvDecos"></div>
		<div id="planesMovGo"></div>
		<div class="buttonCustom">
			<input type="button" id="botonAtras" class="btn btnBack" value="<liferay-ui:message key='botonAtras' />" onclick="siguientePaso(false);" />
			<input type="button" id="botonSiguiente" class="btn btnNext" value="<liferay-ui:message key='botonSiguiente' />" onclick="siguientePaso(true);" />
		</div>
		<div class="containerProgreso">
			<ul>
				<li><p class="plan telefonia"><span class="icon"></span>Telefonía Fija 2 Nacional ilimtada</p>
					<p class="precio">$0000000</p>
				</li>
				<li><p class="plan internet"><span class="icon"></span>Internet 15 megas</p>
					<p class="precio">$0000000</p>
					<li><p class="plan television"><span class="icon"></span>Plan TV Diammante</p>
						<p class="precio">$0000000</p>
					</li>
					<li><p class="plan hd"><span class="icon"></span>Plan HD Plus</p>
						<p class="precio">$0000000</p>
					</li>
					<li><p class="plan deco"><span class="icon"></span>2 Decodificadores Referencia</p>
						<p class="precio">$0000000</p>
					</li>
					<li><p class="total"><span>Total</span></p>
						<p class="precio">$0000000</p>
					</li>
				</li>
			</ul>
		</div>
	</div>
	<div id="tabs" class="span5 xs-span-12" style="display: none;">
		<ul>
			<li>
				<a href="#tabs-1"><liferay-ui:message key='tabTitle1' /></a>

			</li>
			<li>
				<a href="#tabs-2"><liferay-ui:message key='tabTitle2' /></a>

			</li>
		</ul>
		<div id="tabs-1">
			<div id="cotizacion1"></div>
			<input type="hidden" id="divipolaSelected_1" />
			<input type="hidden" id="estratoSelected_1" />
			<input type="hidden" id="productoSelected_1" />
			<input type="hidden" id="planVozSelected_1" />
			<input type="hidden" id="planInternetSelected_1" />
			<input type="hidden" id="planTvSelected_1" />
			<input type="hidden" id="planTvHdSelected_1" />
			<input type="hidden" id="listDecos_1" />
			<input type="hidden" id="planMovGoSelected_1" />
			<input type="hidden" id="planMovVideoSelected_1" />
			<input type="hidden" id="total_1" />
			<input type="hidden" id="total2mes_1" />
			<div class="bloqueCarrito">
				<input type="button" class="btn" id="botonEnviarSolicitud1" value="<liferay-ui:message key='botonSolicitar' />" onclick="solicitarCotizacion();" style="display: none;" />
				<input type="button" class="btn" id="botonCotizacion2" value="<liferay-ui:message key='botonComparar' />" onclick="dataLayer_botonSegundaCotizacion(); initCotizacion2();" style="display: none;" />
			</div>
		</div>
		<div id="tabs-2">
			<div id="cotizacion2"></div>
			<input type="hidden" id="divipolaSelected_2" />
			<input type="hidden" id="estratoSelected_2" />
			<input type="hidden" id="productoSelected_2" />
			<input type="hidden" id="planVozSelected_2" />
			<input type="hidden" id="planInternetSelected_2" />
			<input type="hidden" id="planTvSelected_2" />
			<input type="hidden" id="planTvHdSelected_2" />
			<input type="hidden" id="listDecos_2" />
			<input type="hidden" id="planMovGoSelected_2" />
			<input type="hidden" id="planMovVideoSelected_2" />
			<input type="hidden" id="total_2" />
			<input type="hidden" id="total2mes_2" />
			<div class="bloqueCarrito">
				<input type="button" class="btn" id="botonEnviarSolicitud2" value="<liferay-ui:message key='botonSolicitar' />" onclick="solicitarCotizacion();" style="display: none;" />
			</div>
		</div>
		<input type="button" class="btn" id="botonAmpliarCotizaciones" value="<liferay-ui:message key='botonCompararCotizaciones' />" onclick="dataLayer_botonCompararCotizaciones(); ampliarCotizaciones();" style="display: none;" data-toggle="modal" data-target="#ampliarCotizacionesModal" />
	</div>
	<div id="ampliarCotizacionesModal" style="display: none;" class="modal fade"></div>
	<form id="formSolicitud">
		<div id="divSolicitud" style="display: none;">
			<h1><liferay-ui:message key='homephone-solicitud-title1' /></h1>
			<span class="divSolicitudDesription"><liferay-ui:message key='homephone-solicitud-title2' /></span>
			<div>
				<label for="nombre"><liferay-ui:message key='homephone-solicitud-nombre' /></label>
				<input type="text" id="nombre" name="nombre" placeholder="Nombre" />
			</div>

			<div>
				<label for="telefono"><liferay-ui:message key='homephone-solicitud-telefono' /></label>
				<input type="text" id="telefono" name="telefono" placeholder="Teléfono" maxlength="20" />
			</div>

			<div>
				<label for="email"><liferay-ui:message key='homephone-solicitud-email'  /></label>
				<input type="text" id="email" name="email" placeholder="Mail"/>
			</div>


			<div class="checkEnviar">
				<input type="checkbox" id="sendEmail" />
				<label for=""><liferay-ui:message key='homephone-solicitud-sendEmail' /></label>
				<span><liferay-ui:message key='homephone-solicitud-title3' /></span>
			</div>
			<input type="submit" value="<liferay-ui:message key='botonSolicitar' />" />
		</div>
	</form>
	<div id="divResultSolicitud"></div>
</div>