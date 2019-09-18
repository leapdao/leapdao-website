(() => {
  function initMap() {
    // center of the map
    var center = [35, 4];

    // Create the map
    var zoomLevel = window.innerWidth < 900 ? 1 : 3;
    var map = L.map('map').setView(center, zoomLevel);
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
    };
    var peara = {
      name: 'Vu Ngoc Quang',
      avatar: 'https://avatars2.githubusercontent.com/u/24425403',
      url: 'https://github.com/peara'
    };
    var stevenPearce = {
      name: 'Steven Pearce',
      avatar: 'https://avatars0.githubusercontent.com/u/36509712',
      url: 'https://github.com/StevenJNPearce'
    };
    var sounakPradhan = {
      name: 'Sounak Pradhan',
      avatar: 'https://avatars1.githubusercontent.com/u/22390515',
      url: 'https://github.com/sounak98'
    };
    var kohola71 = {
      name: 'Ola Kohut',
      avatar: 'https://avatars3.githubusercontent.com/u/4106590',
      url: 'https://github.com/kohola71'
    };
    var nanspro = {
      name: 'nanspro',
      avatar: 'https://avatars0.githubusercontent.com/u/24641089',
      url: 'https://github.com/nanspro'
    };
    var iamonuwa = {
      name: 'Onuwa Nnachi Isaac',
      avatar: 'https://avatars1.githubusercontent.com/u/6551094',
      url: 'https://github.com/iamonuwa'
    };
    const artico = {
      name: 'Artico',
      avatar: 'https://avatars3.githubusercontent.com/u/1811630',
      url: 'https://github.com/articobandurini'
    };
    const maxStalker = {
      name: 'Maksim Daunarovich',
      avatar: 'https://avatars3.githubusercontent.com/u/3136647',
      url: 'https://github.com/MaxStalker'
    };
    const maxKuck = {
      name: 'Max Kuck',
      avatar: 'https://avatars2.githubusercontent.com/u/45236782',
      url: 'https://github.com/MaxKuck'
    };
    const tim = {
      name: 'Tim Daubenschütz',
      avatar: 'https://avatars0.githubusercontent.com/u/2758453',
      url: 'https://github.com/TimDaub'
    };
    const vrde = {
      name: 'vrde',
      avatar: 'https://avatars1.githubusercontent.com/u/134680',
      url: 'https://github.com/vrde'
    };

    var berlin = [52.504043, 13.393236];
    var grandRap = [42.9632, -85.6679];
    var bratsk = [56.16667, 101.61667];
    var moscow = [55.75583, 37.61778];
    var ljubljana = [46.05, 14.51667];
    var vegas = [36.1699, -115.1398];
    var prague = [50.08861, 14.42139];
    var seva = [44.6054, 33.5221];
    var hochi = [10.8231, 106.6297];
    var hanover = [52.375, 9.7348];
    var travel = [5.9788, 116.0753];
    var hyderabad = [17.448157, 78.348948];
    var uyo = [7.93, 5.03];
    const kiev = [50.4016, 30.2525];
    const minsk = [53.8845, 27.4532];

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
        iconSize: [25, 25], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
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
    //addPeep(anton, moscow);
    addPeep(kosta, moscow);
    // addPeep(kosta, berlin);
    addPeep(johann, berlin);
    //addPeep(helge, berlin);
    addPeep(pinkiebell, hanover);
    addPeep(peara, hochi);
    addPeep(evgeni, prague);
    // addPeep(evgeni, berlin);
    //addPeep(jan, vegas);
    addPeep(jan, ljubljana);
    // addPeep(jan, berlin);
    //addPeep(stevenPearce, travel);
    //addPeep(sounakPradhan, hyderabad);
    addPeep(nanspro, hyderabad);
    //addPeep(kohola71, berlin);
    addPeep(iamonuwa, uyo);
    addPeep(artico, kiev);
    addPeep(tim, berlin);
    addPeep(vrde, berlin);
    addPeep(maxKuck, berlin);
    addPeep(maxStalker, minsk);

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
