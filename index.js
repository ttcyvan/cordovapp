/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	
	// Constants 
	debug : true,
	verbose : true,
	
	formContentId : "#form_content",
	formId : "#form_quote",
	//formURL : "https://www21.netspace.fr/uca/iut/info/iotia/ProgWebServer/server/cars/index.php",
	formURL : "https://linserv-info-01.iutnice.unice.fr/~ry805397/index.php",
	formMethod : "POST",
	
	// Application Constructor
	initialize : function() {
		// Mobile Device
		//$(document).bind( 'deviceready', this.onDeviceReady);
		// Browser
		$(document).ready( app.onDeviceReady);
		
		$(document).bind( 'mobileinit', function(){
			$.mobile.defaultPageTransition = "slide";
			});
	},

	//
	onDeviceReady : function() {
		if ( app.debug) console.log( 'Form URL : ' + app.formURL);
		$( app.formContentId).load( app.formURL, function() {
			if ( app.debug) console.log( 'Form Id : ' + app.formId);
			$( app.formId).unbind().submit( app.formSubmit);
			// Ajax submit on some changes
			$( "select, :radio, :checkbox, #return_price").on( 'change', app.formSubmit);
			});
		},
	
	//
	formSubmit : function( e) {
		if ( app.debug) {
			console.log( 'Begin of submit Form Id : ' + app.formId);
			console.log( 'with URL : ' + app.formURL);
		}
		e.preventDefault();
		var form = $( app.formId)
		$.ajax( {
			type : app.formMethod,
			// type : form.attr( 'method'),
			url : app.formURL,
			//url : form.attr( 'action'),
			data : form.serialize(),
			dataType : 'html',
			success : function( data) {
				// On success code
				//$( app.formContentId).html( data);
				$( app.formContentId).html( data).trigger('create');
				},
			error : function () {
				// On error code
				alert( 'Submit errror for ' + app.formId)
				},
			complete : function() {
				// After success…
				$( app.formId).unbind().submit( app.formSubmit);
				// Ajax submit on some changes
				$( "select, :radio, :checkbox, #return_price").on( 'change', app.formSubmit);
				},
			cache: false
			});
		if ( app.debug) console.log( 'End of submit Form Id   : ' + app.formId);
		}
		
	};

app.initialize();
