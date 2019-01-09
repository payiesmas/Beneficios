/*var nombre_usuario = $("#UNOMBRE").val();
var Apaterno = $("#UAPATERNO").val();
var Amaterno = $("#UAMATERNO").val();
var coreo_usuario = $("#UEMAIL").val();
var tipo_usuario = $("#UTIPO").val();*/


/*var nombre_usuario = "";
var Apaterno = "";
var Amaterno = "";
var coreo_usuario = "";
var tipo_usuario = "";

var datas = JSON.parse(this.responseText);
nombre_usuario = datas.nombre;
Apaterno = datas.apaterno;
Amaterno = datas.amaterno;
coreo_usuario = datas.correo;
tipo_usuario = datas.tipo;*/

var iddeusuarioseleccionado = 0;


function Mostrarusuarios() {
    comprobar_navegador()
    Respuestaajax.onreadystatechange = function () {
        if (Respuestaajax.readyState == 4 && Respuestaajax.status == 200) {
            document.getElementById("tablausuarios").innerHTML = Respuestaajax.responseText;
        };
    };
    Respuestaajax.open("POST", "../Admin/mostrarusuarios.php", true);
    Respuestaajax.send();
};


function alluser(iduser) { //funcion para obtener datos y mostrarlo en el modal

    iddeusuarioseleccionado = iduser;

    $(function () {
        $("#Concentracion").hide();
        $("#TODOUSERS").fadeIn(500);
    });
      

    $("td").hover(function () {
        //obtenemos los valores del elemento que se hizo click 
        var am = this;
        var an = $(am).next();
        var ap = $(an).next();
        var at = $(ap).next();
        var ae = $(at).next();
        var ti = $(ae).next();
        $("#UEMAIL").val($(am).text());
        $("#UNOMBRE").val($(ap).text());
        $("#UAPATERNO").val($(at).text());
        $("#UAMATERNO").val($(ae).text());
        $("#UTIPO").val($(ti).text());
        //$("#UEMAIL").val($(ae).text());
    });

};


$(function(){

    $("#CERRARINFODEUSER").click(function () {
        $("#TODOUSERS").fadeOut(500);
    });
});

function borraruser(borraruserid) { //funcion para borrar usuarios
    var confirmacion = confirm("Estas Seguro que quieres eliminar este registro");
    if (confirmacion == true) {
        var respuestaajax = new XMLHttpRequest(); // esta es para los modernos
        respuestaajax.onreadystatechange = function () {
            if (respuestaajax.readyState == 4 && respuestaajax.status == 200) {
                $(function () {
                    $("#IALERTA2").show(500, function () {
                        $("#IALERTA2").html(respuestaajax.responseText);
                    });
                });
                Mostrarusuarios()

            };
        };
        var informaciondeusuario ='idusuario=' + borraruserid;

        respuestaajax.open("POST", "../Admin/eliminaruser.php", true);
        respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        respuestaajax.send(informaciondeusuario);
    };


};

$(function () {
    
    $("#UACTUALIZAR").click(function () { //actualizar datos personales
        var respuestaajax = new XMLHttpRequest(); // esta es para los modernos
        var a = $("#UNOMBRE").val();
        var b = $("#UAPATERNO").val();
        var c = $("#UAMATERNO").val();
        var d = $("#UEMAIL").val();
        var e = $("#UTIPO").val();
        

        if (e == "") {
            $("#IALERTA1").slideDown(500, function () {
                $("#IALERTA1").html('<div class="alert alert-danger alert-dismissible aler">' +
                    '<a class="close" onclick="desbane() + ocul()" data-dismiss="alert" aria-label="close" >×</a>' +
                    '<strong>Alerta!</strong> Es necesario escribir todos los datos</div >');
            });
        } else {
            var confirma = confirm("Estas Seguro que quieres actualizar registro los datos.");
            if (confirma == true) {

                var informaciondeusuario =
                    'nombre=' + a +
                    '&apaterno=' + b +
                    '&amaterno=' + c +
                    '&email=' + d +
                    '&tipo=' + e +
                    '&idusuario=' + iddeusuarioseleccionado;
            
                respuestaajax.onreadystatechange = function () {
                    if (respuestaajax.readyState == 4 && respuestaajax.status == 200) {
                        //document.getElementById("alerta4").innerHTML = this.responseText;
                        $(function () {
                            $("#alerta4").show(500, function () {
                                $("#alerta4").html(respuestaajax.responseText);
                            });
                           
                        });
                    };
                };
                respuestaajax.open("POST", "../Admin/actualizardatos.php", true);
                respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                respuestaajax.send(informaciondeusuario);
            };
        };
    });


    $("#BTNRESETPASS").click(function () { //actualizar datos personales
        var respuestaajax = new XMLHttpRequest(); // esta es para los modernos
        var a = $("#UEMAIL").val();

        if (a == "") {
            $("#IALERTA1").slideDown(500, function () {
                $("#IALERTA1").html('<div class="alert alert-danger alert-dismissible aler">' +
                    '<a class="close" onclick="desbane() + ocul()" data-dismiss="alert" aria-label="close" >×</a>' +
                    '<strong>Alerta!</strong> Es necesario escribir todos los datos</div >');
            });
        } else {
            var confirma = confirm("Estas Seguro que quieres actualizar registro los datos.");
            if (confirma == true) {

                var informaciondeusuario =
                    'idusuario=' + iddeusuarioseleccionado + '&txtemail=' + a ;

                respuestaajax.onreadystatechange = function () {
                    if (respuestaajax.readyState == 4 && respuestaajax.status == 200) {
                        $(function () {
                            $("#alerta4").show(500, function () {
                                $("#alerta4").html(respuestaajax.responseText);
                            });
                           
                        });
                    };
                };
                respuestaajax.open("POST", "../Admin/recetpass.php", true);
                respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                respuestaajax.send(informaciondeusuario);
            };
        };
    });




    $("#BTNPASS").click(function () {
        var respuestaajax = new XMLHttpRequest(); // esta es para los modernos
        
        var f = $("#UPASSWORD").val();
        var g = $("#UNUEVOPASS").val();
        var h = $("#CONFPASS").val();
        var informaciondeusuario =
            'password=' + f +
            '&npassword=' + g +
            '&cpassword=' + h;
        respuestaajax.onreadystatechange = function () {
            if (respuestaajax.readyState == 4 && respuestaajax.status == 200) {
                Alertas.innerHTML = this.responseText;
                $(function () {
                    $("#IALERTA1").slideDown(500, function () {
                        $("#IALERTA1").html(respuestaajax.responseText);
                    });
                    $("#UPASSWORD").val("");
                    $("#UNUEVOPASS").val("");
                    $("#CONFPASS").val("");
                });
            };
        };
        respuestaajax.open("POST", "../Admin/actualizarpass.php", true);
        respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        respuestaajax.send(informaciondeusuario);
    });

    
    //modal-1
    $("#ADMINM").click(function () {
        mosadmin();
        $("#Adminbd").fadeOut(500);
        $("#txtcuenta").select();
    });
    $("#spanm3").click(function () {
        $("#Adminbd").fadeOut(500);
        $("#txtcuenta").val("");
        $("#txtorden").val("");
        $("#txtelefono").val("");
        $("#txthub").val("");
        $("#txtrpt").val("");
        $("#txttipoos").val("");
        $("#txtfvisita").val("");
        $("#txthvisita").val("");
        $("#txtstatus").val("");
        $("#txtcomentarios").val("");
        $("#txtcuenta").select();

    });


    $("#btnlimpiar").click(function () {
        $("#txtcuenta").val("");
        $("#txtorden").val("");
        $("#txtelefono").val("");
        $("#txthub").val("");
        $("#txtrpt").val("");
        $("#txttipoos").val("");
        $("#txtfvisita").val("");
        $("#txthvisita").val("");
        $("#txtstatus").val("");
        $("#txtcomentarios").val("");
        
    });


    //modal-2
      
    
    //actualizar mi contraseña de la cuenta
    
    $("#NUEWPASS").click(function () {
        $("#UPASSW").fadeIn(500);
        Mostrarusuarios();
    });
    
    $("#CERRARPASS").click(function () {
        $("#UPASSW").fadeOut(500);
    });
    // //actualizar datos de la cuenta
    // $("#CAMBPASS").click(function () {
    //     $("#UPASS").fadeIn(500);
    //     $("#D1").hide();
    //     $("#D2").show();
    //     $("#D3").hide();
    //     $("#D4").hide();
    //     $("#UACTUALIZAR").show();
    //     $("#BTNPASS").hide();

    //     $("#FORMPASS").hide();
    //     $("#FORMDATOS").show();
    //     $("#Titulo1").text("Datos de la cuenta");


    //     $("#UNOMBRE").val(nombre_usuario);
    //     $("#UAPATERNO").val(Apaterno);
    //     $("#UAMATERNO").val(Amaterno);
    //     $("#UEMAIL").val(coreo_usuario);
    // });

       
  
    //modal-3
    
    $("#BDUSUARIOS").click(function () {
        $("#Concentracion").fadeIn(500);
        Mostrarusuarios();
    });
    
    $("#CERRARCON").click(function () {
        $("#Concentracion").fadeOut(500);
    });

    //modal-4
    $("#NUEVOUSER").click(function () {
        $("#MODALNUEVOUSER").fadeIn(500);
    });
    $("#CERRARNUEVO").click(function () {
        $("#MODALNUEVOUSER").fadeOut(500);
    });
     //registrar nuevo usuario datos de la cuenta
    $("#UGUARDAR").click(function () {
        var respuestaajax = new XMLHttpRequest(); // esta es para los modernos
        var a = $("#NUNOMBRE").val();
        var b = $("#NUAPATERNO").val();
        var c = $("#NUAMATERNO").val();
        var d = $("#NUEMAIL").val();
        var e = $("#NUTIPO").val();

        var informaciondeusuario =
            'nombre=' + a +
            '&apaterno=' + b +
            '&amaterno=' + c +
            '&email=' + d +
            '&tipo=' + e;

        respuestaajax.onreadystatechange = function () {
            if (respuestaajax.readyState == 4 && respuestaajax.status == 200) {
                Alertas.innerHTML = this.responseText;
                $(function () {
                    $("#IALERTA3").slideDown(500, function () {
                        $("#IALERTA3").html(respuestaajax.responseText);
                    });
                    $("#NUNOMBRE").val("");
                    $("#NUAPATERNO").val("");
                    $("#NUAMATERNO").val("");
                    $("#NUEMAIL").val("");
                    $("#NUTIPO").val("");
                });
            };
        };
        respuestaajax.open("POST", "../Admin/nuevousuario.php", true);
        respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        respuestaajax.send(informaciondeusuario);

    });

    $("#UNLIMPIAR").click(function(){
        $("#NUNOMBRE").val("");
        $("#NUAPATERNO").val("");
        $("#NUAMATERNO").val("");
        $("#NUEMAIL").val("");
        $("#NUTIPO").val("");
    });


   

});




/*function chatenlinea() {
    comprobar_navegador()
    Respuestaajax.onreadystatechange = function () {
        if (Respuestaajax.readyState == 4 && Respuestaajax.status == 200) {
            document.getElementById("allmensages").innerHTML = Respuestaajax.responseText;
        };
    };
    Respuestaajax.open("POST", "../Admin/chat/Mensajes.php", true);
    Respuestaajax.send();
}


$(function () {
    
    


    $("#formmsg").submit(function(event) {
        event.preventDefault()
        comprobar_navegador();
        Respuestaajax.onreadystatechange = function () {
            if (Respuestaajax.readyState == 4 && Respuestaajax.status == 200) {
                chatenlinea();
                $("#enviomsg").val("")

                
            };
        };
        var a = $("#enviomsg").val();
        var txtvalores = 'msgenviado=' + a ; //convertimos valores a formato JSON
        Respuestaajax.open("POST", "../Admin/chat/nuevoMensajes.php", true);
        Respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        Respuestaajax.send(txtvalores);
    });

    


});*/

//setInterval(function () { chatenlinea(); }, 1000);  // funcion para mostrar los datos en tiempo real

/*
onload = function () {
    setInterval(function () {if (window.parar) return; document.getElementById('contchat').scrollTop = document.getElementById('contchat').scrollHeight}, 100);
};*/