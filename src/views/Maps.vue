<template>
  <div class="google-map" :id="mapName"></div>
</template>
<script>
export default {
  name: 'google-map',
  props: ['name'],
  data: function () {
    return {
      mapName: this.name + "-map",
      markerCoordinates: [
        {
        latitude: 25.654441,
        longitude: -100.287157,
        title: "<h3>Centro de Reciclaje TEC</h3><br><span><b>Tipo de Reciclaje:</b> Cárton y Papel</span><br><span><b>Horarios:</b> 9:00 am - 6:00 pm</span><br><span><b>Dirección:</b> Sin Nombre de Colonia 34, Tecnológico, 64849 Monterrey, Nuevo Leon</span>"
        },
        {
          latitude: 25.654830,
          longitude: -100.304573,
          title: "<h3>Reciclados GR</h3><br><span><b>Tipo de Reciclaje:</b> Metales</span><br><span><b>Horarios:</b> 10:00 am - 5:00 pm</span><br><span><b>Dirección:</b> Sinaloa #1400, Nuevo Repueblo, 64720 Monterrey, N.L.</span>"
        },
        {
          latitude: 25.665165,
          longitude: -100.296542,
          title: "<h3>E.W. basura electrónica</h3><br><span><b>Tipo de Reciclaje:</b> Electrónica</span><br><span><b>Horarios:</b> 9:00 am - 6:00 pm</span><br><span><b>Dirección:</b> 2a. Zona 239, Caracol, 64810 Monterrey, N.L.</span>"
        }
      ],
      map: null,
      bounds: null,
      markers: []
    }
  },
  mounted: function () {
    this.bounds = new google.maps.LatLngBounds();

    const element = document.getElementById(this.mapName)
    const mapCentre = this.markerCoordinates[0]

    const options = {
      center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
    }

    const infowindow = new google.maps.InfoWindow()

    this.map = new google.maps.Map(element, options)
    this.markerCoordinates.forEach((coord) => {
      const position = new google.maps.LatLng(coord.latitude, coord.longitude)
      const marker = new google.maps.Marker({ 
        position,
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: coord.title
      })
      this.markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))
    })

    this.markers.forEach((marker) => {
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(marker.title)
        infowindow.open(this.map, marker)
      })
    })
  }
};
</script>
<style scoped>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: gray;
}
</style>