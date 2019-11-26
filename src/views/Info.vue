<template>
  <v-container fluid>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-text>
          <v-layout row wrap px-3>
            <img src="@/assets/plasticTypes.png" alt="" style="width: 450px; margin: 10px 0">
            <span class="font-weight-bold">(PET o PETA)</span> Plástico transparente utilizado para botellas de agua o refrescos. Es uno de los plásticos que podemos reciclar con seguridad.
            <br>
            <br>
            <span class="font-weight-bold">(HDPE)</span> Plástico que se utiliza para juguetes, detergentes, envases de leche y algunas bolsas de plástico. Se considera uno de los plásticos más seguros y es reusable y reciclable.
            <br>
            <br>
            <span class="font-weight-bold">(PVC)</span> Plástico suave utilizado para crear empaques para comida transparentes, juguetes de niños y de mascotas. Este tipo de plástico no es reciclable debido a las toxinas que puede liberar durante su ciclo de vida.
            <br>
            <br>
            <span class="font-weight-bold">(LDPE)</span> Encontrado en botellas, en los empaques de pan y en los empaques de tintorería. Este tipo de plástico es reciclable en ciertos centros de reciclaje.
            <br>
            <br>
            <span class="font-weight-bold">(Polipropileno)</span> Para pañales desechables, popotes, cinta, contenedores de yogurt entre otros. Consulta con tu centro de reciclaje local para verificar si este tipo de plástico lo pueden reciclar.
            <br>
            <br>
            <span class="font-weight-bold">(Poliestireno)</span> Para empaques de comida para llevar, vasos, cartones de huevo, utensilios entre muchos otros. Este tipo de plástico debería evitarse lo más posible. Es muy difícil encontrar centros que reciclen este tipo, pero si existen.
            <br>
            <br>
            <span class="font-weight-bold">(Otros)</span> Debido a que este tipo incluye varios tipos de plástico, los protocolos de reciclaje no están estandarizados.
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-layout row wrap class="justify-center">
      <v-flex xs12 md8>
        <h1 class="nunito center">¿Qué se puede reciclar?</h1>
        <v-layout row wrap>
          <v-flex class="center" col sm6 xs12 md4>
            <v-card class="center card">
              <img src="@/assets/plastic.png" alt="">
              <h3>PLÁSTICO</h3>
              <p class="pa-4 text-justify">
                El plástico se puede dividir en diferentes tipos: 
                <br>
                PET, HDPE, PVC, LDPE, Polipropileno, Poliestireno, u otros.
              </p>
                <v-icon dark>mdi-info</v-icon>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="openInfoDialog()" text icon color="green">
                  <v-icon dark>info</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex class="center" col sm6 xs12 md4>
            <v-card class="center card">
              <img src="@/assets/paper.png" alt="">
              <h3>PAPEL</h3>
              <p class="pa-4 text-justify">
                ¿Qué tipo de papel se puede reciclar?
                <ul>
                  <li>El papel roto sí se puede reciclar</li>
                  <li>No es necesario remover grapas y clips antes de mandar el papel a reciclar</li>
                  <li>Si tu centro de reciclaje acepta papel mixto, muy posiblemente acepte papel con adhesivos</li>
                </ul>
              </p>
            </v-card>
          </v-flex>
          <v-flex class="center" col sm6 xs12 md4>
            <v-card class="center card">
              <img src="@/assets/glass.png" alt="">
              <h3>VIDRIO</h3>
              <p class="pa-4 text-justify">
                El vidrio también es 100% reciclable y se puede reciclar sin preocupación de perdida en calidad y puridad.
                <br>
                <ul>
                  <li>Evita que se rompa, puede ser peligroso y además es poco valioso</li>
                  <li>Si se rompe un vidrio grande deberás hablar con una compañía especializada para que se encargue de llevarse el material</li>
                </ul>
              </p>
            </v-card>
          </v-flex>
          <v-flex class="center" col sm6 xs12 md4>
            <v-card class="center card">
              <img src="@/assets/metal.png" alt="">
              <h3>METAL</h3>
              <p class="pa-4 text-justify">
                Casi todos los metales son reciclables.
                <br>
                <br>
                Los tipos de metales que son reciclables: 
                Aluminio, Latón y bronce, Hierro fundido, Cobre, Acero, Estaño
                <br>
                <br>
                Tipos de metales que no son reciclables: 
                Uranio, Plutonio, Mercurio, Objetos que contengan plomo.
              </p>
            </v-card>
          </v-flex>
          <v-flex class="center" col sm6 xs12 md4>
            <v-card class="center card">
              <img src="@/assets/ewaste.png" alt="">
              <h3>ELECTRÓNICOS</h3>
              <p class="pa-4 text-justify">
                Se pueden reciclar:
                <ul>
                  <li>Teles, monitores</li>
                  <li>Teléfonos</li>
                  <li>Computadoras</li>
                  <li>Fotocopiadoras o impresoras</li>
                  <li>Laptops</li>
                  <li>Periféricos de computadoras</li>
                  <li>Dispositivos electrónicos personales</li>
                  <li>Equipos de video y audio, también para el carro</li>
                </ul>
              </p>
            </v-card>
          </v-flex>
          <v-flex class="center" col sm6 xs12 md4>
            <v-card class="center card">
              <img src="@/assets/battery.png" alt="">
              <h3>PILAS</h3>
              <p class="pa-4 text-justify">
                Casi todos los tipos de pila son reciclables:
                <ul>
                  <li>ácido</li>
                  <li>óxido de plata</li>
                  <li>Alcalinas</li>
                  <li>Litio</li>
                  <li>Níquel-cadmio</li>
                  <li>Níquel-metal</li>
                </ul>
              </p>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: function () {
    return {
      dialog: false,
      
    }
  },
  methods: {
    openInfoDialog () {
      this.dialog = true
    }
  }
}
</script>
<style scoped>
  .nunito {
    font-family: 'Nunito', sans-serif;
  }

  .center {
    text-align: center;
  }

  img {
    width: 150px;
    margin: 20px; 
  }

  p {
    font-size: 13px;
  }

  .card {
    height: 100%;
  }
</style>