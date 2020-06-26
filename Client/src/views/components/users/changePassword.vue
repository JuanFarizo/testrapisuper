
<template>
    <div class="mainContainer ">
        <div class="logoContainer headerContainer div-center">
            <div class="logo">
                <img :src="getImg('/images/logo/clientHeader.png')" @click="$router.push({name: 'index'})"/>
            </div>
        </div>
        <div class="div-center titleContainer">
            <h1 class="title tt-title center-text ">
                Recuperá tu contraseña
            </h1>
        </div>
        <h5 class=" subtitle  tt-title center-text">
                Introducí tu correo electrónico para mandarte
                el formulario de cambio de contraseña:
            </h5>
        <div class="div-center input-text">
            <vs-input icon-after="true" icon="email" label-placeholder="correo electronico"
             v-model="useremail"/>
        </div>
        <div class="div-center">
            <vs-button color="dark" type="gradient" @click="Validation()"> ENVIAR
            </vs-button>
        </div>

        <div v-if="this.valid == true">
            <p class="center-text">
                 El mail fue enviado a {{useremail}}. Consulte su bandeja de entrada
                para seguir con el procedimiento.
            </p>


        </div>

    </div>
</template>


<script>
// import emailjs from 'emailjs-com';

    export default {
       data(){
           return{
                username: "", //el nickname del usuario verificado
                useremail:"",//el mail ingresado
                valid: true,



           }

       },
        created(){

             emailjs.init("user_giym9tjxscyS1EiKxodRB");
        },
        methods:{

            Validation(){
                //validar el mail ingresado con los mails del sistema
                // for(i=0;i<1;i++){
                //     if(this.useremail == 'email a comparar'){
                //         this.valid = true;
                //          this.username = 'el nombre del usuario verificado'
                //     }
                // }

                if(this.valid == true){
                   this.sendEmail(this.useremail, thi.username);
                }else{
                    this.openAlert();
                }
            } ,
            openAlert(){
             this.$vs.dialog({
                color:'rgb(79,195,241)',
                title: `Ups!`,
                text: 'Parece que el correo electrónico ingresado no es de un usuario registrado. Revise lo que escribió.',

             });
            },
            sendEmail (m_useremail, m_username){
                var user_data = {
                    "user_email": m_useremail,
                    "user_name": m_username
                };
                var service_id = "default_service";
                var template_id = "recoverypassword";
                emailjs.send(service_id,template_id,user_data,"RapiSuper")

            }
        }
    }
</script>

<style lang="scss">
    div{
        display: flex;
        flex-direction: column;

    }
    .div-center{
        align-items: center;
        display: flex;

    }
    .mainContainer {
        background-color: #15B0CE;
        height: 100vh;
    }
    .logoContainer{
        background-color: white;
    }
    .title{
        color: white;
        padding: 15px;
        font-size: 22px;
        @media (max-width: 450px) {
            font-size: 20px;
        }
        @media (max-width: 370px) {
            font-size: 17px;
        }
    }
    .titleContainer{
        background-color:#22223E
    }
    .subtitle{
        padding-top: 30px
    }
     .logo{
        height: 100px;
        img {
            height: 100%;
            cursor: pointer;
        }
        padding: 25px 0;
        @media (max-width: 370px) {
            padding: 15px 0;
            height: 70px;
        }
    }
    .center-text{
        text-align: center;
    }
     .vs-input{
         margin: 15px;
    }



</style>
