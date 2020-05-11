<script>
  import { onMount } from "svelte";
  import { peeps } from "./peeps";
  let mapEl;
  let initialized = false;

  function initMap() {
    // center of the map
    const center = [35, 40];

    // Create the map
    const zoomLevel = window.innerWidth < 900 ? 1 : 3;
    const map = L.map("map", {zoomControl: false}).setView(center, zoomLevel);
    //map.scrollWheelZoom.disable();

    // Set up the OSM layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
        minZoom: 2,
      maxZoom: 7,
      detectRetina: true
    }).addTo(map);



    const markers = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 10,
      iconCreateFunction: function(cluster) {
        const childMarkers = cluster.getAllChildMarkers().reverse();
        const peepIcons = childMarkers
          .map(e => {
            const icon = e.options.icon.options;
            return `<img src="${icon.iconUrl}" width="${icon.iconSize[0]}" height="${icon.iconSize[1]}" />`;
          })
          .join("");
        const names = childMarkers.map(e => e.options.title).join(", ");
        return L.divIcon({
          html: `<div title="${names}">${peepIcons}</div>`,
          className: "peeps-cluster"
        });
      }
    });
    
    function addPeep(peep) {
      const icon = L.icon({
        iconUrl: peep.avatar,
        iconSize: [55, 55], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [27, 27], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
      });

      markers.addLayer(
        L.marker(peep.location, {
          icon: icon,
          title: peep.name
        }).on("click", () => {
          window.open(peep.url);
        })
      );
    }

    peeps.forEach(peep => {
      addPeep(peep);
    });

    map.addLayer(markers);
  }

  function scrollHandler() {
    const mapRect = mapEl.getBoundingClientRect();
    if (mapRect.top < window.innerHeight) {
      if (!initialized) {
        Promise.all([
          import("leaflet/dist/leaflet.css"),
          import("leaflet.markercluster/dist/MarkerCluster.css"),
          import("leaflet.markercluster/dist/MarkerCluster.Default.css"),
          import("leaflet/dist/leaflet.js")
        ])
          .then((...args) => {
            return import(
              "leaflet.markercluster/dist/leaflet.markercluster.js"
            );
          })
          .then(initMap);
        initialized = true;
      }

      Array.from(document.querySelectorAll("link[disabled]")).forEach(link => {
        link.removeAttribute("disabled");
      });

      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", scrollHandler);
    }
  }

  onMount(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("resize", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", scrollHandler);
    };
  });
</script>

<style>
  .map {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #aad3df;
  }
</style>

<div class="map">
  <div style="width: 100%; height: 100%;" id="map" bind:this={mapEl} />
</div>
