// Import required modules and constants
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import axios from 'axios'; 
import { initialize } from "next/dist/server/lib/render-server";
// Route segment config
export const runtime = "edge";


// Define a function to handle GET requests
export async function GET(req: NextRequest) {
  // Extract title from query parameters
  const { searchParams } = req.nextUrl;
  var desc = searchParams.get("desc");
  const fid = searchParams.get("fid");
  var a = searchParams.get("a");
  var entry = searchParams.get("entry");
  entry = entry?.split(' ');
  
  console.log(entry);
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
  if(parseInt(entry[0])!== 0){
    if(na.indexOf(entry[0])>=0 && parseInt(entry[1]) >=9 && parseInt(entry[1]) <= 12){
      desc = 'Booking were confirmed successfully';

    }else{
      desc = 'Something went wrong, try with different entry';

    }
  }else{
     desc = 'Something went wrong, try with different entry';
  }
  console.log(na);
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
        <img style={{
          position: "relative",
        }} src="https://img.freepik.com/free-vector/desk-calendar-with-marked-dates-3d-cartoon-style-icon-planning-time-meeting-scheduling-flat-vector-illustration-appointment-deadline-agenda-reminder-time-management-concept_74855-25964.jpg?t=st=1724495376~exp=1724498976~hmac=192fe635c0004703e514328f7bf2d96aa21108c360911d8d6e2b52385ea235ad&w=740" width={400}></img>
        <>          
        <h2
          style={{
            position: "relative",
            textAlign: "center",
            fontSize: 100,
            fontFamily: "Outfit",
            fontStyle: "bold",
            color: "black",
            marginRight: '300px',
            marginLeft: '300px',
          }}
        >
        {desc}  
        </h2>
        
        </>
       <>
        <img style={{
          position: "relative",
          borderRadius: '75px',
          top: '50px'
        }} src={data.result.user.pfp.url} width={150}></img>
        <h5
          style={{
            position: "relative",
            textAlign: "center",
            fontSize: 70,
            fontFamily: "Outfit",
            fontStyle: "bold",
            color: "black",
            marginBottom: '250px',
            top: '50px',
            marginLeft: '50px'
          }}
        >
        {data.result.user.displayName}  
        </h5>
       </>


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