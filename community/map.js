(() => {
  function initMap() {
    // center of the map
    var center = [45, 10];

    // Create the map
    var map = L.map('map').setView(center, 3);
    map.scrollWheelZoom.disable();

    // Set up the OSM layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
      detectRetina: true
    }).addTo(map);

    var sunify = {
      name: 'Alexander Lunyov',
      avatar: 'https://avatars3.githubusercontent.com/u/1477583',
      url: 'https://github.com/sunify'
    };
    var helge = {
      name: 'Helge Wieding',
      avatar: 'https://avatars3.githubusercontent.com/u/754426',
      url: 'https://github.com/HelgeWieding'
    };
    var zobro = {
      name: 'Jonathan Zobro',
      avatar: 'https://avatars2.githubusercontent.com/u/61939',
      url: 'https://github.com/VonIobro'
    };
    var anton = {
      name: 'Anthony Akentiev',
      avatar: 'https://avatars1.githubusercontent.com/u/1623033',
      url: 'https://github.com/AnthonyAkentiev'
    };
    var jan = {
      name: 'Jan Kremser',
      avatar: 'https://avatars2.githubusercontent.com/u/41610198',
      url: 'https://github.com/eezcjkr'
    };
    var evgeni = {
      name: 'Evgeni Shavkunov',
      avatar: 'https://avatars3.githubusercontent.com/u/28968492',
      url: 'https://github.com/eshavkun'
    };
    var kosta = {
      name: 'Kosta Korenkov',
      avatar: 'https://avatars2.githubusercontent.com/u/163447',
      url: 'https://github.com/troggy'
    };
    var johann = {
      name: 'Johan Barbie',
      avatar: 'https://avatars1.githubusercontent.com/u/659301',
      url: 'https://github.com/johannbarbie'
    };
    var pinkiebell = {
      name: 'Pinkiebell',
      avatar: 'https://avatars2.githubusercontent.com/u/40266861',
      url: 'https://github.com/pinkiebell'
    }
    var peara = {
      name: 'Vu Ngoc Quang',
      avatar: 'https://avatars2.githubusercontent.com/u/24425403',
      url: 'https://github.com/peara'
    }

    var berlin = [52.504043, 13.393236];
    var grandRap = [42.9632, -85.6679];
    var bratsk = [56.16667, 101.61667];
    var moscow = [55.75583, 37.61778];
    var ljubljana = [46.05, 14.51667];
    var prague = [50.08861, 14.42139];
    var seva = [44.6054, 33.5221];
    var hochi = [10.8231, 106.6297];
    var offen = [48.4735, 7.9498];

    const markers = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 10,
      iconCreateFunction: function(cluster) {
        const childMarkers = cluster.getAllChildMarkers().reverse();
        const peepIcons = childMarkers
          .map(e => {
            const icon = e.options.icon.options;
            return `<img src="${icon.iconUrl}" width="${
              icon.iconSize[0]
            }" height="${icon.iconSize[1]}" />`;
          })
          .join('');
        const names = childMarkers.map(e => e.options.title).join(', ');
        return L.divIcon({
          html: `<div title="${names}">${peepIcons}</div>`,
          className: 'peeps-cluster'
        });
      }
    });
    function addPeep(peep, coords) {
      var icon = L.icon({
        iconUrl: peep.avatar,
        iconSize: [20, 20], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0], // the same for the shadow
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
      });

      markers.addLayer(
        L.marker(coords, {
          icon: icon,
          title: peep.name
        }).on('click', () => {
          window.open(peep.url);
        })
      );
    }

    addPeep(sunify, bratsk);
    addPeep(zobro, grandRap);
    addPeep(anton, moscow);
    addPeep(kosta, seva);
    // addPeep(kosta, berlin);
    addPeep(johann, berlin);
    addPeep(helge, berlin);
    addPeep(pinkiebell, offen);
    addPeep(peara, hochi);
    addPeep(evgeni, prague);
    // addPeep(evgeni, berlin);
    addPeep(jan, ljubljana);
    // addPeep(jan, berlin);

    map.addLayer(markers);
  }

  const mapEl = document.getElementById('map');
  const scrollHandler = () => {
    const mapRect = mapEl.getBoundingClientRect();
    if (mapRect.top < window.innerHeight) {
      initMap();

      Array.from(document.querySelectorAll('link[disabled]')).forEach(link => {
        link.removeAttribute('disabled');
      });

      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', scrollHandler);
    }
  };
  window.addEventListener('scroll', scrollHandler);
  window.addEventListener('resize', scrollHandler);
})();
