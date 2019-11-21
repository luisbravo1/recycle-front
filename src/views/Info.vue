<template>
  <v-container fluid>
    <v-layout row wrap class="justify-center">
      <v-flex xs12 md8>
        <h1 class="nunito center">¿Qué se puede reciclar?</h1>
        <v-layout row wrap>
          <v-flex class="center" col sm6 xs12 md4>
            <v-card class="center">
              <img src="@/assets/plastic.png" alt="">
              <h3>PLASTICO</h3>
              <p>Como por ejemplo: botellas</p>
            </v-card>
          </v-flex>
          <v-flex class="center" col sm6 xs12 md4>
            <v-card class="center">
              <img src="@/assets/paper.png" alt="">
              <h3>PAPEL</h3>
              <p>info sobre materiales</p>
            </v-card>
          </v-flex>
          <v-flex class="center" col sm6 xs12 md4>
            <v-card class="center">
              <img src="@/assets/glass.png" alt="">
              <h3>VIDRIO</h3>
              <p>info sobre materiales</p>
            </v-card>
          </v-flex>
          <v-flex class="center" col sm6 xs12 md4>
            <v-card class="center">
              <img src="@/assets/metal.png" alt="">
              <h3>METAL</h3>
              <p>info sobre materiales</p>
            </v-card>
          </v-flex>
          <v-flex class="center" col sm6 xs12 md4>
            <v-card class="center">
              <img src="@/assets/ewaste.png" alt="">
              <h3>ELECTRONICOS</h3>
              <p>info sobre materiales</p>
            </v-card>
          </v-flex>
          <v-flex class="center" col sm6 xs12 md4>
            <v-card class="center">
              <img src="@/assets/battery.png" alt="">
              <h3>PILAS</h3>
              <p>info sobre materiales</p>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

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
</style>