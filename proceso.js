var resultado = document.getElementById("info"); //VARIABLE GLOBAL
var Alertas = document.getElementById("IALERTA"); //VARIABLE GLOBAL
var Respuestaajax;


function comprobar_navegador() {// esta instrucions es para los navegadores antiguos y modernos
    if (window.XMLHttpRequest) {
        Respuestaajax = new XMLHttpRequest(); //nuevos
    } else {
        Respuestaajax = new ActiveXObject("Microsoft.XMLHTTP"); //antiguos
    };
};




//variables globales
var paginaactual = 1; // variable que asigna un valor que la pagina de comienzo se posicione en la pagina 1
var desde = 1;  //desde que pagina se mostrara 
var hasta = 15;//hasta que pagina se va a mostrar
var xpagina = document.getElementById("Cdad").value; // asiga un valor de cuantos registros se mostraran por pagina
var residuo = 0;
var residuo2 = 0;
var ultimapa = 0;

////////////


function Mostrartabla() { //muestra toda la base de datos
    var filtro = document.getElementById("TREPORTE").value;
    comprobar_navegador()
    Respuestaajax.onreadystatechange = function () {
        if (Respuestaajax.readyState == 4 && Respuestaajax.status == 200) {
            document.getElementById("info").innerHTML = Respuestaajax.responseText;
        };   
    };
    var txtvalores = 'desde='+desde + '&hasta='+hasta + '&xpagina='+xpagina + '&filtro='+ filtro;
    Respuestaajax.open("POST", "../Admin/mostrar.php", true);
    Respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Respuestaajax.send(txtvalores);
};

Mostrartabla();

function porpagina() { // muestra una cantidad de registros por el usuario
    comprobar_navegador()
    xpagina = document.getElementById("Cdad").value;
    Respuestaajax.onreadystatechange = function () {
        if (Respuestaajax.readyState == 4 && Respuestaajax.status == 200) {
            document.getElementById("info").innerHTML = Respuestaajax.responseText;
        };   
    };
    var txtvalores = 'desde='+desde + '&hasta='+hasta + '&xpagina='+xpagina;
    Respuestaajax.open("POST", "../Admin/Paginador.php", true);
    Respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Respuestaajax.send(txtvalores);
};
function paginacion(npag,opcion) { // al dar clic al numero de pagina llamara los datos que tiene esa pagina
    var pagina = npag;
    paginaactual = npag;
    comprobar_navegador();
    Respuestaajax.onreadystatechange = function () {
        if (Respuestaajax.readyState == 4 && Respuestaajax.status == 200) {
            document.getElementById("info").innerHTML = Respuestaajax.responseText;
        };  
    };
    var txtvalores = 'pagina=' + pagina + '&peticion='+opcion +'&desde='+desde + '&hasta='+hasta + '&xpagina='+xpagina;
    Respuestaajax.open("POST", "../Admin/Paginador.php", true);
    Respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Respuestaajax.send(txtvalores);
};
function primepag() { // al dar clic se regrasara a la primera pagina 
    var pagina = 1;
    comprobar_navegador();
    Respuestaajax.onreadystatechange = function () {
        if (Respuestaajax.readyState == 4 && Respuestaajax.status == 200) {
            document.getElementById("info").innerHTML = Respuestaajax.responseText;
        };  
    };
    paginaactual = 1
    desde = 1;  //desde que pagina se mostrara 
    hasta = 15; //hasta que pagina se va a mostrar 
    var txtvalores = 'pagina=' + pagina+'&desde='+desde + '&hasta='+hasta + '&xpagina='+xpagina;
    Respuestaajax.open("POST", "../Admin/Paginador.php", true);
    Respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Respuestaajax.send(txtvalores);
    
};
function ultimapag(ultimapa) {// al dar clic se regrasara a la ultima pagina 
    comprobar_navegador();
    var pagina = ultimapa;  
    paginaactual = ultimapa; // asignamos valor  para enviarlo y se posicione en la ultima pagina
    Respuestaajax.onreadystatechange = function () {
        if (Respuestaajax.readyState == 4 && Respuestaajax.status == 200) {
            document.getElementById("info").innerHTML = Respuestaajax.responseText;
        };  
    };
        var residuo = ultimapa % 15 -1;
        residuo2 = ultimapa - residuo;

        if(ultimapa >= 15){
            desde = ultimapa - residuo;
            hasta = ultimapa;
        };  
    var txtvalores = 'pagina=' + pagina+'&desde='+desde + '&hasta='+hasta + '&xpagina='+xpagina;
    Respuestaajax.open("POST", "../Admin/Paginador.php", true);
    Respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Respuestaajax.send(txtvalores);
};

function Patras() {
    var pagina = paginaactual -1;
    paginaactual = pagina;
    comprobar_navegador();
    Respuestaajax.onreadystatechange = function () {
        if (Respuestaajax.readyState == 4 && Respuestaajax.status == 200) {
            document.getElementById("info").innerHTML = Respuestaajax.responseText;
        };  
    };

    if (paginaactual < desde && paginaactual <= residuo2){
        desde = desde - 15;
        hasta = desde + 14;
    };

    var txtvalores = 'pagina=' + pagina+'&desde='+desde + '&hasta='+hasta + '&xpagina='+xpagina;
    Respuestaajax.open("POST", "../Admin/Paginador.php", true);
    Respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Respuestaajax.send(txtvalores);
};

function Padelante(masadelante) {
    var pagina = paginaactual +1;
    paginaactual = pagina;
    comprobar_navegador();
    Respuestaajax.onreadystatechange = function () {
        if (Respuestaajax.readyState == 4 && Respuestaajax.status == 200) {
            document.getElementById("info").innerHTML = Respuestaajax.responseText;
        };  
    };
    if (masadelante >= hasta){
        desde = desde + 15;
        hasta = hasta + 15;
    };
    var txtvalores = 'pagina=' + pagina+'&desde='+desde + '&hasta='+hasta + '&xpagina='+xpagina;
    Respuestaajax.open("POST", "../Admin/Paginador.php", true);
    Respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Respuestaajax.send(txtvalores);
};


function FTREPORTE() {
    comprobar_navegador();
    Respuestaajax.onreadystatechange = function () {
        if (Respuestaajax.readyState == 4 && Respuestaajax.status == 200) {
            document.getElementById("info").innerHTML = Respuestaajax.responseText;
        };  
    };

    var filtro = document.getElementById("TREPORTE").value;
    var txtvalores = 'desde='+desde + '&hasta='+hasta + '&xpagina='+xpagina + '&filtro='+ filtro;
    Respuestaajax.open("POST", "../Admin/Paginador.php", true);
    Respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Respuestaajax.send(txtvalores);
   
};


$(function () {
    $("#ititulochat").click(function () {
        $("#ventanachat").slideToggle(500);
    });
    $("#BTBABRIR").click(function () {
        //$("#BUSQUEDA").toggle(500);
        $("#GRAL").toggle(500);
    });

    ///solo numeros
    $("#txtcuentab").keypress(function () {
        if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;
    });
    $("#txtelefono").keypress(function () {
        if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;
    });
    $("#txtcuenta").keypress(function () {
        if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;
    });
    $("#txttel").keypress(function () {
        if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;
    });

    $("#MTABLA").click(function () {
        Mostrartabla();
        $("#txtcuenta").val("");
        $("#txtnom").val("");
        $("#txttel").val("");
        $("#txtemail").val("");
    });


    $("#BUSQUEDAGRAL").keyup(function () {
        paginaactual = 1;  // variabla global de paginacion
        desde = 1;  //desde que pagina se mostrara 
        hasta = 15;//hasta que pagina se va a mostrar
        comprobar_navegador();
            Respuestaajax.onreadystatechange = function () {
                if (Respuestaajax.readyState == 4 && Respuestaajax.status == 200) {
                    resultado.innerHTML = this.responseText;
                };
            };
            var a = document.getElementById("BUSQUEDAGRAL").value;
            var txtvalores = 'cuenta=' + a + '&desde='+desde + '&hasta='+hasta  + '&xpagina='+xpagina;
        Respuestaajax.open("POST", "../Admin/Totalbd.php", true);
        Respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        Respuestaajax.send(txtvalores);
    });




    $("#txtcuentab").keyup(function () {
        $("#txtnomb").val("");
        $("#txttelb").val("");
        $("#txtemailb").val("");
        comprobar_navegador();
        if (txtcuentab.value === "") {
            Mostrartabla();
        } else {
            Respuestaajax.onreadystatechange = function () {
                if (Respuestaajax.readyState == 4 && Respuestaajax.status == 200) {
                    resultado.innerHTML = this.responseText;
                };
            };
            var a = document.getElementById("txtcuentab").value;
            var txtvalores = 'cuenta=' + a;
        };
        Respuestaajax.open("POST", "../Admin/bcuenta.php", true);
        Respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        Respuestaajax.send(txtvalores);
    });

    $("#txtnomb").keyup(function () {
        $("#txtcuentab").val("");
        $("#txttelb").val("");
        $("#txtemailb").val("");
        comprobar_navegador();
        if (txtnomb.value === "") {
            Mostrartabla();
        } else {
            Respuestaajax.onreadystatechange = function () {
                if (Respuestaajax.readyState == 4 && Respuestaajax.status == 200) {
                    resultado.innerHTML = this.responseText;
                };
            };
            var a = document.getElementById("txtnomb").value;
            var txtvalores = 'nombre=' + a;
        };
        Respuestaajax.open("POST", "../Admin/buscarnom.php", true);
        Respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        Respuestaajax.send(txtvalores);
    });
    $("#txttelb").keyup(function () {
        $("#txtcuentab").val("");
        $("#txtnomb").val("");
        $("#txtemailb").val("");
        comprobar_navegador();
        if (txttelb.value === "") {
            Mostrartabla();
        } else {
            Respuestaajax.onreadystatechange = function () {
                if (Respuestaajax.readyState == 4 && Respuestaajax.status == 200) {
                    resultado.innerHTML = this.responseText;
                };
            };
            var a = document.getElementById("txttelb").value;
            var txtvalores = 'txttel=' + a;
        };
        Respuestaajax.open("POST", "../Admin/buscartel.php", true);
        Respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        Respuestaajax.send(txtvalores);
    });
    $("#txtemailb").keyup(function () {
        $("#txtcuentab").val("");
        $("#txtnomb").val("");
        $("#txttelb").val("");
        comprobar_navegador();
        if (txtemailb.value === "") {
            Mostrartabla();
        } else {
            Respuestaajax.onreadystatechange = function () {
                if (Respuestaajax.readyState == 4 && Respuestaajax.status == 200) {
                    resultado.innerHTML = this.responseText;
                };
            };
            var a = document.getElementById("txtemailb").value;
            var txtvalores = 'txtemail=' + a;
        };
        Respuestaajax.open("POST", "../Admin/buscaremail.php", true);
        Respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        Respuestaajax.send(txtvalores);
    });

    $("#btnguardar").click(function () {
        var respuestaajax = new XMLHttpRequest(); // esta es para los modernos
        var a = document.getElementById("txtcuenta").value;
        var b = document.getElementById("txtorden").value;
        var c = document.getElementById("txtelefono").value;
        var d = document.getElementById("txthub").value;
        var e = document.getElementById("txtrpt").value;
        var f = document.getElementById("txttipoos").value;
        var g = document.getElementById("txtfvisita").value;
        var h = document.getElementById("txthvisita").value;
        var i = document.getElementById("txtstatus").value;
        var j = document.getElementById("txtcomentarios").value;

            var informaciondeusuario =
            'cuenta=' + a +
            '&orden=' + b +
            '&telefono=' + c +
            '&hub=' + d +
            '&rpt=' + e +
            '&txttipoos=' + f +
            '&fvisita=' + g +
            '&hvisita=' + h +
            '&status=' + i +
            '&comentarios=' + j ;

        respuestaajax.onreadystatechange = function () {
            if (respuestaajax.readyState == 4 && respuestaajax.status == 200) {
                Alertas.innerHTML = this.responseText;
                $(function () {
                    $("#IALERTA").slideDown(500, function () {
                        $("#IALERTA").html(respuestaajax.responseText);
                    });
                    Mostrartabla();
                    
                });
            };
        };
        respuestaajax.open("POST", "../Admin/guardar.php", true);
        respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        respuestaajax.send(informaciondeusuario);
    });

    $("#btneditar").click(function () {
        var respuestaajax = new XMLHttpRequest(); // esta es para los modernos
        var a = document.getElementById("txtcuenta").value;
        var b = document.getElementById("txtnom").value;
        var c = document.getElementById("txttel").value;
        var d = document.getElementById("txtemail").value;
        if (a == "") {
            $("#IALERTA").slideDown(500, function () {
                $("#IALERTA").html('<div class="alert alert-danger alert-dismissible aler">' +
                    '<a class="close" onclick="desbane() + ocul()" data-dismiss="alert" aria-label="close" >×</a>' +
                    '<strong>Alerta!</strong> Es necesario escribir un numero de cuenta</div >');
            });



        } else {
            var confirmacion = confirm("Estas Seguro que quieres actualizar este registro.");
            if (confirmacion == true) {

                var informaciondeusuario =
                    'cuenta=' + a +
                    '&nombre=' + b +
                    '&tel=' + c +
                    '&correo=' + d;

                respuestaajax.onreadystatechange = function () {
                    if (respuestaajax.readyState == 4 && respuestaajax.status == 200) {
                        Alertas.innerHTML = this.responseText;
                        $(function () {
                            $("#IALERTA").slideDown(500, function () {
                                $("#IALERTA").html(respuestaajax.responseText);
                            });
                            Mostrartabla();
                        });
                    };
                };
                respuestaajax.open("POST", "../Admin/editar.php", true);
                respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                respuestaajax.send(informaciondeusuario);
            };
        };
    });

});

function eliminarreg(oselim) {
    
    var confirmacion = confirm("Estas Seguro que quieres eliminar este registro");
    if (confirmacion == true) {
        var respuestaajax = new XMLHttpRequest(); // esta es para los modernos
        respuestaajax.onreadystatechange = function () {
            if (respuestaajax.readyState == 4 && respuestaajax.status == 200) {
                Alertas.innerHTML = this.responseText;
                Mostrartabla();
            };
        };
        var informaciondeusuario ='orden=' + oselim;
        respuestaajax.open("POST", "../Admin/eliminar.php", true);
        respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        respuestaajax.send(informaciondeusuario);
    };
};

function ocul() {
    document.getElementById("IALERTA").style.display = "none";
    document.getElementById("IALERTA1").style.display = "none";
};
function mosadmin() { //funcion para obtener datos y mostrarlo en el modal
    $(function () {
        $("#Adminbd").fadeIn(500);
    });
};

function valpor() { //funcion para obtener datos y mostrarlo en el modal
    $(function () {
        $("#Edicion").fadeIn(500);
    });
    
    $("td").hover(function () {
        //obtenemos los valores del elemento que se hizo click 
        
        var am = this;
        var an = $(am).next();
        var at = $(an).next();
        var ae = $(at).next();
        $("#VCUENTA").val($(am).text());
        $("#VORDEN").val($(an).text());

       
    });

};

$(function () {
    $("#spanm4").click(function () {
        $("#Edicion").fadeOut(500);
        $("#IALERTA").hide(500);


    });
});



$("#valactualizado").click(function () {
    var respuestaajax = new XMLHttpRequest(); // esta es para los modernos
    var a = document.getElementById("VORDEN").value;
    var b = document.getElementById("VESTATUS").value;
    if (a == "") {
        $("#IALERTA").slideDown(500, function () {
            $("#IALERTA").html('<div class="alert alert-danger alert-dismissible aler">' +
                '<a class="close" onclick="desbane() + ocul()" data-dismiss="alert" aria-label="close" >×</a>' +
                '<strong>Alerta!</strong> Es necesario escribir un numero de cuenta</div >');
        });
    } else {
        var confirmacion = confirm("Estas Seguro que quieres actualizar este registro.");
        if (confirmacion == true) {

            var actualizarcion =
                'orden=' + a +
                '&estatus=' + b;

            respuestaajax.onreadystatechange = function () {
                if (respuestaajax.readyState == 4 && respuestaajax.status == 200) {
                    Alertas.innerHTML = this.responseText;
                    $(function () {
                        $("#IALERTA").slideDown(500, function () {
                            $("#IALERTA").html(respuestaajax.responseText);
                        });
                        Mostrartabla();
                    });
                };
            };
            respuestaajax.open("POST", "../Admin/editar.php", true);
            respuestaajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            respuestaajax.send(actualizarcion);
        };
    };
});



//setInterval(function () {Mostrartabla();},1000);  // funcion para mostrar los datos en tiempo real
//setInterval(function () {Mostrartabla();},1000);  // funcion para mostrar los datos en tiempo real






