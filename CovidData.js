const FIRST_DATA_DATE = new Date("1/22/20");
const LAST_DATA_DATE = new Date("4/19/20");

let CovidData = function(countryData) {    
    this.mesh = CovidData.initDataCircle(countryData);  
    this.mesh.userData = this;

    this.data = countryData;
    this.currentCircleScale = 1;
}

CovidData.initDataCircle = function(data) {
    let geometry = new THREE.CircleGeometry(.5, 32);
    let mat = new THREE.MeshBasicMaterial({color: 0xFF0000, transparent: true, opacity: 0.4 });    
    let mesh = new THREE.Mesh( geometry, mat ) ;

    //console.log(data)
    //console.log("country log lat", country.Long, country.Lat);
    let pos = proj.inverse({x: data.Long, y: data.Lat});
    //console.log("pos", pos);
    mesh.position.x = pos.x;
    mesh.position.y = pos.y;
    mesh.position.z = .1;
    //mesh.scale.set(10,10,1);    

    return mesh;
    //console.log(mesh.position)
}

CovidData.prototype = { 
    getConfirmedCasesFromDate : function(date) {
        let objDate = new Date(date);
        let strDate = objDate.toLocaleDateString("en", ({ month:"numeric", day:"numeric", year: "2-digit"}));
        
        return this.data[strDate];
    },
    updateScale: function() {
        let confirmed = this.data[selectedDate];
        //console.log(date);
        this.currentCircleScale = Math.log2(confirmed) * 1;
        //this.mesh.scale.set(scale, scale, 1);

    },
    updateCircle: function() {
        this.mesh.scale.set(this.currentCircleScale, this.currentCircleScale, 1);

        
    }
    

}
