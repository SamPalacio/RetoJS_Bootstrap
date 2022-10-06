    
    
        let notas;
        let porcentajes;
        let calculate_btn =document.querySelector("#calculate")
        let add =document.querySelector("#add")
        let grade = document.querySelector(".grade")
        let grades = document.querySelector("#grades")
        let closeBtn= document.querySelector(".btn-close")
        let result = document.querySelector(".result-description")
        let resultTitle = document.querySelector(".modal-title")
        let modal = document.querySelector(".modal")
        let closeModal = modal.querySelector(".btn-close");

        calculate_btn.addEventListener("click",Calculate);
        add.addEventListener("click",Add )
        closeBtn.addEventListener("click",deleteGrade)
        closeModal.addEventListener("click", ()=>{ modal.classList.remove("d-block")})

        function Calculate(){
            notas =[];
            porcentajes=[];

            let value = grades.querySelectorAll(".grade");
            value.forEach(x => {

                console.log(x)
                const nota=parseFloat(x.querySelector(".grade_value").value)
                const percentage=parseFloat(x.querySelector(".percentage_value").value)
                if (!isNaN(nota)&&!isNaN(percentage)){
                    notas.push(nota);
                    porcentajes.push(percentage);
                }



            })


                modal.classList.add("d-block");
                Promediar(notas,porcentajes)
        }
    
    function Add(){

        let clonedNode = grade.cloneNode(true);
        let closeBtn=clonedNode.querySelector(".btn-close");
        let inputsClone =clonedNode.querySelectorAll("input");
        inputsClone[0].value="";
        inputsClone[1].value="";
        closeBtn.addEventListener("click",deleteGrade);
        grades.appendChild(clonedNode)

    }
    
    function deleteGrade(){
        let grade=this.parentNode.parentNode;
        grades.removeChild(grade);
        console.log(grade)
    }
 

    function Promediar(notas, porcentajes) {
        let calificacionActual = 0;
        let porcentajeRestante = 0;
        let porcentaje = 0;
        let notaRestante = 0;


        if (notas.length!=porcentajes.length){
            resultTitle.innerHTML="Ha ocurrido un error"
            result.innerHTML="Error! Ingrese una nota por cada promedio";
            return;
        }

        if (isNaN(notas[0])||isNaN(porcentajes[0]))
        {
            resultTitle.innerHTML="Ha ocurrido un error"
            result.innerHTML="Error! Ingrese bien los datos";
            return;

        }
        else
        {
            console.log(notas.length)
        }


        for (let i = 0; i < notas.length; i++) {

            if (notas[i]>5||porcentajes[i]>100||notas[i]<0||porcentajes[i]<0){

                resultTitle.innerHTML="Ha ocurrido un error"
                result.innerHTML="Error! El valor maximo de las notas es 5 y porcentaje 100";
                return;
            }
            calificacionActual += notas[i] * (porcentajes[i] / 100);
            porcentaje += porcentajes[i];
        }
        porcentajeRestante = 100 - porcentaje;
        notaRestante = (3 - (calificacionActual)) / (porcentajeRestante / 100)


        if (calificacionActual < 0 || porcentaje <= 0) {
            resultTitle.innerHTML="Ha ocurrido un error"
            result.innerHTML="Error en los datos";
            return;
        }



        if (porcentajeRestante<0){
            resultTitle.innerHTML="Ha ocurrido un error"
            result.innerHTML="La suma de los porcentajes tiene que ser igual a 100";
            return;
        }



        if (notaRestante <= 0||isNaN(notaRestante)) {
            resultTitle.innerHTML="Ya pasaste la materia";

            result.innerHTML="Excelente"

            console.log("Ya pasaste la materia")
        }
        else {

                if (notaRestante>5){
                    resultTitle.innerHTML="Ya perdiste";
                    result.innerHTML="No hay nada que hacer";

                }
                else {


                    result.innerHTML="Tu califiacion actual es " + calificacionActual.toFixed(2) + " Debes sacar " + notaRestante.toFixed(2) + " en el proximo " + porcentajeRestante + "%";
                    resultTitle.innerHTML="Esfuerzate";

                }

        }

    }