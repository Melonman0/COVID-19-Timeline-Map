const FIRST_DATA_DATE = new Date("1/22/20");
const LAST_DATA_DATE = new Date("4/19/20");

let CovidData = function(json, color) {
    this.json = json;
    this.color = color;
    this.mesh = null;           
}

CovidData.prototype = { 
    getDataFromDate : function(date) {
        let objDate = new Date(date);
        let strDate = objDate.toLocaleDateString("en", ({ month:"numeric", day:"numeric", year: "2-digit"}));
        
        return json[strDate];
    },

}
