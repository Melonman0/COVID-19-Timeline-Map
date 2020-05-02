const FIRST_DATA_DATE = new Date("1/22/20");
const LAST_DATA_DATE = new Date("5/1/20");

let CovidCountryData = function(countryData) {    
    this.shapeColor = 0xFF0000;
    this.mesh = CovidCountryData.initDataCircle(countryData);  
    this.mesh.userData = this;

    this.data = countryData;
    this.currentCircleScale = 0;
    this.newCircleScale = 1;   
    this.lerpNum = 0; 
}

CovidCountryData.useLinearScale = false;
CovidCountryData.initDataCircle = function(data) {
    let geometry = new THREE.CircleGeometry(.5, 32);
    let mat = new THREE.MeshBasicMaterial({color: 0xFF0000, transparent: true, opacity: 0.4 });    
    let mesh = new THREE.Mesh( geometry, mat ) ;

    let pos = proj.inverse({x: data.Long, y: data.Lat});
    
    mesh.position.x = pos.x;
    mesh.position.y = pos.y;
    mesh.position.z = .1;
    
    return mesh;
}
CovidCountryData.getTotalConfirmedByDate = function(date, covidCountryList, wfomatter) {
    if(covidCountryList.length === 0)
        return "Calculating..."

    return wfomatter.to(covidCountryList.reduce((a, b) => a += parseInt(b.data[date]), 0)); 
}


CovidCountryData.prototype = { 
    getConfirmed: function(dateString) {
        return this.data[dateString];
    },
    getInfoString(dateString, wfomatter) {
        let provState = (this.data["Province/State"]) ? `, ${this.data["Province/State"]}` : "";
        return `${this.data["Country/Region"]}${provState} - ${wfomatter.to(this.getConfirmed(dateString))} Confirmed`;
    },
    
    //Method to update what data circle should scale to
    setConfirmed(dateString) {
        let confirmed = this.data[dateString];
        
        if(CovidCountryData.useLinearScale) {
            this.newCircleScale = confirmed/10000;
        } else {
            this.newCircleScale = (Math.log(confirmed+1)/Math.log(4));
        }
        
        this.lerpNum = 0;         
    },
    
    //Method to animate tween
    renderUpdate: function(delta) {
        this.lerpNum += delta;
        this.currentCircleScale = THREE.MathUtils.lerp(this.currentCircleScale, this.newCircleScale, THREE.MathUtils.clamp(this.lerpNum * 1.5, 0, 1)); 

        this.mesh.scale.set(this.currentCircleScale, this.currentCircleScale, 1);         
    }    
}
