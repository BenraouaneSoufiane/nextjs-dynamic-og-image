// Import required modules and constants
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import axios from 'axios'; 
import { initialize } from "next/dist/server/lib/render-server";
// Route segment config
export const runtime = "edge";
const date = new Date();
var initialized = false;
const ii = function(v,limit,a1){
  let r = [];
  r.push(<>{rr(v,v+6,a1)}</>);
  v=v+7;
  for(v;v<limit;v=v+7){
      
       
     
        r.push(<>{rr(v,v+6,a1)}</>);

        
      
      
  }
    return r;
}
const rr = function(i,limit,a1){
let r = [];
var advan = 0;

console.log(advan);
  for(i;i<=limit;i++){
    
    if(i>31 && limit < 38){
      limit = limit-i+1;
      i = 1;      
    }else if(i>31){
      limit = limit-31;
      i=i-31;
    }
    if(limit-i == date.getDay() || initialized == true){ 
      if(initialized===false){
        if(a1.indexOf(JSON.stringify(i-advan))>=0){
          r.push(<li key={i-advan} style={{backgroundColor:'#63FF90', width: '80px', textAlign: 'center', position: "relative", marginLeft: '55px', marginRight:'55px'}} >{i-advan}</li>)
          initialized = true;
        }else{
          r.push(<li key={i-advan} style={{backgroundColor:'gray', width: '80px', textAlign: 'center', position: "relative", marginLeft: '55px', marginRight:'55px'}} >{i-advan}</li>)
          initialized = true;
        }
       
      }else{
        if(a1.indexOf(JSON.stringify(i))>=0){
          r.push(<li key={i} style={{backgroundColor:'#63FF90', width: '80px', textAlign: 'center', position: "relative", marginLeft: '55px', marginRight:'55px'}} >{i}</li>)
        }else{
          r.push(<li key={i} style={{backgroundColor:'gray', width: '80px', textAlign: 'center', position: "relative", marginLeft: '55px', marginRight:'55px'}} >{i}</li>)

        }
      }      
    }else {
      r.push(<li key={i} style={{backgroundColor:'#C1C1C1', width: '80px', textAlign: 'center', position: "relative", marginLeft: '55px', marginRight:'55px'}} >x</li>)            
      advan = advan + 1;
    }
    
 


  }
  return (<ul key={limit} style={{
    position: "relative",
    textAlign: "center",
    fontSize: 48,
    fontFamily: "Outfit",
    color: "black",
    marginBottom: '50px'
  }} className="weekdays">{r}</ul>);
}
// Define a function to handle GET requests
export async function GET(req: NextRequest) {
  // Extract title from query parameters
  const { searchParams } = req.nextUrl;
  const desc = searchParams.get("desc");
  const fid = searchParams.get("fid");
  var a = searchParams.get("a");
  let a1 = [];
  let na = [];
  a = a.match(/\[(.*?)\]/gm) ? a.match(/\[(.*?)\]/gm): null;
  //console.log(a);
  if( a !==null){
     a1 = a[0]?a[0].match(/\[(.*?)\]/):a;
    a1 = a1[1]?a1[1].split(' '):a1;
    
    //console.log(a1);
    var a2 = a[1]?a[1].match(/\[(.*?)\]/):a;
    a2 = a2[1]?a2[1].split(' '):a2;
    //console.log(a2[0])
    a2.forEach((element)=>{
      if(element.indexOf('-')>=0){
        na.push(element.split('-')[0]);
        for(var o = parseInt(element.split('-')[0])+1; o<=element.split('-')[1];o++){
          na.push(JSON.stringify(o));
  
        }
      }else{
        na.push(element);
      }
      //console.log(element);
   })
   na.forEach((element)=>{
    a1.push(element)
   })
  }
  
  const {data} = await axios.get('https://client.warpcast.com/v2/user-by-fid?fid='+fid)
  //console.log(data.result.user);
  //const allowance =  await axios.get('https://api.degen.tips/airdrop2/allowances?fid='+data[0].fid);

 
  //console.log(data);
  // Fetch the Outfit font frclearom the specified URL
  /*const font = fetch(
    new URL("../../../../public/fonts/outfit-semibold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());
  const fontData = await font;*/
  
    const r =  new ImageResponse(
      (
        <div
          style={{          
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: 'white',
            alignItems: "center",
            

          }}
        >
          <>
          <img style={{
            position: "relative",
            borderRadius: '75px',
            top: '50px'          

          }} src={data.result.user.pfp.url} width={125}></img>
          <h5
            style={{
              position: "relative",
              textAlign: "left",
              fontSize: 70,
              fontFamily: "Outfit",
              fontStyle: "bold",
              color: "black",
              top: '40px',
              marginLeft: '20px',
              marginRight: '50px'
            }}
          >
          {data.result.user.displayName}  
          </h5>
          <img style={{
            position: "relative",
            left: '50px',
            bottom: '20px'
          }} src="https://img.freepik.com/free-vector/desk-calendar-with-marked-dates-3d-cartoon-style-icon-planning-time-meeting-scheduling-flat-vector-illustration-appointment-deadline-agenda-reminder-time-management-concept_74855-25964.jpg?t=st=1724495376~exp=1724498976~hmac=192fe635c0004703e514328f7bf2d96aa21108c360911d8d6e2b52385ea235ad&w=740" width={250}></img>
          </>
          <>          
        
          <ul style={{
              position: "relative",
              textAlign: "center",
              fontSize: 72,
              fontFamily: "Outfit",
              fontStyle: "bold",
              color: "black",
            }} className="weekdays">
  <li style={{position: "relative", marginLeft: '50px', marginRight:'50px'}} >Mo</li>
  <li style={{position: "relative", marginLeft: '50px', marginRight:'50px'}}>Tu</li>
  <li style={{position: "relative", marginLeft: '50px', marginRight:'50px'}}>We</li>
  <li style={{position: "relative", marginLeft: '50px', marginRight:'50px'}}>Th</li>
  <li style={{position: "relative", marginLeft: '50px', marginRight:'50px'}}>Fr</li>
  <li style={{position: "relative", marginLeft: '50px', marginRight:'50px'}}>Sa</li>
  <li style={{position: "relative", marginLeft: '50px', marginRight:'50px'}}>Su</li>
</ul>
</>

{ii(date.getDate(),date.getDate()+31,a1)}
<div style={{
  position: "relative",
  marginBottom: "160px"
}}>

</div>
          
         
  
  
        </div>
      ),
      // ImageResponse options
      {
        width: 1920,
        height: 1080
        /*fonts: [
          {
            name: "Outfit",
            data: fontData,
            style: "normal",
          },
        ],*/
      },
    );
    //console.log(r);
    // Create an ImageResponse with dynamic content
    return r
  
  
}