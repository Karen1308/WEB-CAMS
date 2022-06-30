function EnviarMail(enviado) {
  const respuestaCompleta=enviado.response
  const respuestas=respuestaCompleta.getItemResponses();
  const email=respuestaCompleta.getRespondentEmail();
  Logger.log(email)

  const mailCombo=respuestas[0].getResponse();
  const nombre=respuestas[1].getResponse();
  const mailPersona=respuestas[2].getResponse();
  const telefono=respuestas[3].getResponse();
  const consulta=respuestas[4].getResponse();
  
  Logger.log(mailCombo+' '+nombre+' '+mailPersona+' '+telefono+' '+consulta)


  const var3=respuestas[3].getResponse();
  var mensaje = "Nombre: "+nombre
 
  mailCombo.substr(11);
  Logger.log(mailCombo) 
  var textoHtml=HtmlService.createHtmlOutputFromFile("mail").getContent();
  textoHtml=textoHtml.replace("{{nombre}}",nombre)
  textoHtml=textoHtml.replace("{{mailCombo}}",mailCombo)
  textoHtml=textoHtml.replace("{{mailPersona}}",mailPersona)
  textoHtml=textoHtml.replace("{{telefono}}",telefono)
  textoHtml=textoHtml.replace("{{consulta}}",consulta)
 
  GmailApp.sendEmail(mailCombo,"Consulta WEB - CAMS IAMPP",mensaje,{htmlBody:textoHtml})
}

  function permisos(){
    GmailApp.sendEmail("informatica.eduardohaedo@camsor.com.uy","Probando","prueba")
  FormApp.getActiveForm();
  }
 


/*
respuestas.forEach(respuesta=>{
    const item=respuesta.getItem()
    Logger.log(item.getIndex())
    Logger.log(item.getId().toString())
    Logger.log(item.getTitle())
    
    Logger.log(respuesta.getResponse())
  })



*/
/*Logger.log(item.getRespondentEmail())*/




