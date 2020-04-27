const FIRST_DATA_DATE = new Date("1/22/20");
const LAST_DATA_DATE = new Date("4/19/20");

let CovidData = function(countryData) {    
    this.shapeColor = 0xFF0000;
    this.mesh = CovidData.initDataCircle(countryData);  
    this.mesh.userData = this;

    this.data = countryData;
    this.currentCircleScale = 1;    
}

CovidData.initDataCircle = function(data) {
    let geometry = new THREE.CircleGeometry(.5, 32);
    let mat = new THREE.MeshBasicMaterial({color: 0xFF0000, transparent: true, opacity: 0.4 });    
    let mesh = new THREE.Mesh( geometry, mat ) ;

    let pos = proj.inverse({x: data.Long, y: data.Lat});
    
    mesh.position.x = pos.x;
    mesh.position.y = pos.y;
    mesh.position.z = .1;
    
    return mesh;
}

CovidData.prototype = { 
    getConfirmed: function(dateString) {
        return numberformatter.to(this.data[dateString]);
    },
    getInfoString(dateString) {
        let provState = (this.data["Province/State"]) ? `, ${this.data["Province/State"]}` : "";
        return `${this.data["Country/Region"]}${provState} - ${this.getConfirmed(dateString)}`;
    },
    updateCircle: function(dateString) {
        let confirmed = this.data[dateString];

        this.currentCircleScale = Math.log(confirmed)/Math.log(3);
        //this.currentCircleScale = confirmed/10000;
        this.mesh.scale.set(this.currentCircleScale, this.currentCircleScale, 1);                
    }    
}
