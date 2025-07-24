const eventenddate=new Date("2025-08-01T12:00:00").getTime();
//const eventstartdate=new Date().getTime();

let eventstartdate= localStorage.getItem("eventstartdate");
if (!eventstartdate) {
    eventstartdate = new Date().getTime();
    localStorage.setItem("eventstartdate", eventstartdate);
} else {
    eventstartdate = parseInt(eventstartdate);
}

function updateTime(){

    const currdate=new Date().getTime();
    const distprogress=currdate-eventstartdate;
    const distpending=eventenddate-currdate;

    //-ve  distance error handling
    if (distpending < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML =`<h2 style="color: red; font-size: 2rem;">⏰ E X P I R E D !.... </h2>`;
        document.getElementById("progress-bar").style.width = "100%";
        return;
    }

    //timer and sdistance logic:
    //1 day=24*60*60*1000 milisecs....
    const days=Math.floor(distpending/(24*60*60*1000));
    const hrs=Math.floor(distpending%(24*60*60*1000)/(60*60*1000));
    const mins=Math.floor(distpending%(60*60*1000)/(60*1000));
    const secs=Math.floor(distpending%(60*1000)/(1000));

    //changes in timer UI :
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hrs;
    document.getElementById("minutes").innerHTML = mins;
    document.getElementById("seconds").innerHTML = secs;

    //width progress changes 
    const totaldist=eventenddate-eventstartdate;
    const percentdist=(distprogress/totaldist)*100;

    //changes in width ui :
    document.getElementById("progress-bar").style.width=percentdist+"%";

    

}

const timer = setInterval(updateTime, 1000);
