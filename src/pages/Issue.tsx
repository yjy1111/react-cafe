import{useState, useEffect, useRef} from 'react'
import { Link,useLocation } from 'react-router-dom'
import styles from './Issue.module.css'
function Issue() {
    // const images=useRef([{src:'https://via.placeholder.com/150'},{src:'https://via.placeholder.com/150'},{src:'https://via.placeholder.com/150'}])
    const images = useRef([
      {src: "http://www.news-paper.co.kr/news/photo/201804/26384_11661_5657.jpg", title:'탐엔탐스', subtitle:'펭-탐! 콜라겐 요거트 망고 스무디를 즐겨보세요',pathname:'/dessert/U8SbS9Ue7057fmzIAp8j'},
      {src: "https://res.heraldm.com/content/image/2015/07/16/20150716000149_0.jpg", title:'KANNA ON COFFEE', subtitle:'재즈밴드의 연주를 들으면서 책을 읽을 수 있어요!',pathname:'/study/w898nXezdP6UL4CtIFQH'}, 
      {src: "https://static.hubzum.zumst.com/hubzum/2021/08/06/00/3557eb83ba4047ac9665b0ca49d560d1.jpg",title:'ANARKH', subtitle:'지하3층부터 5층까지 있는 카페를 만나보세요',pathname:'/big/aVkP0PLol7Nh3M1UgBuU'},
      {src:"https://www.noblesse.com/shop/data/board/magazine/e7c7075d3503050b",title:'WaveOnCoffee', subtitle:'부산의 바다와 커피를 함께!',pathname:'/view/LuaHbNGiq31QidfeIPJw'},
      {src:"https://post-phinf.pstatic.net/MjAyMTA1MjRfNDAg/MDAxNjIxODMzMjUyOTU4.TFyyRB0vSpihm3E2t5Mv9AAWNE8Z_yj8qu9FAxOOmTAg.gGBTdcMEPLS_XRJoT0P1H6csV6-h_2H6vLgmygXwul4g.JPEG/image_3540911991621832305515.jpg?type=w1200",title:'모모스', subtitle:'2019년 월드바리스타 챔피언십 한국인 최초 우승자의 커피를 맛보세요',pathname:'/goodcoffee'},
      {src:"https://hng.yna.co.kr/media/content/8468/1645574953927176.jpg",title:'캐어포커피', subtitle:'테라스 애견동반 가능!',pathname:'/withpet/VWQDKIbNWUIXeiuE0J41'}]);
    const [current,setCurrent]=useState(0)
    const [style,setStyle]=useState({transform:`translate(-${current}00%)`})
    const imgSize=useRef(images.current.length)

    const moveSlide=(i:number)=>{
      let nextIndex=current+i 
      if (nextIndex<0) {nextIndex=imgSize.current-1}
      else if(nextIndex>=imgSize.current){nextIndex=0}
      setCurrent(nextIndex)
    }
    useEffect(()=>{
      setStyle({transform:`translate(-${current}00%)`})
    },[current])
    return (
      <div className={styles.body}>
        <h1>이달의 카페!</h1>
        <h3>지난 달 가장 많이 언급된 카페를 소개합니다.</h3>
        <div className={styles.container}>
          <div className={styles.slide}>
            <div className={styles.btn} onClick={() => { moveSlide(-1); }}><i className="bi bi-chevron-compact-left"></i></div>
            <div className={styles.window}>
              <div className={styles.flexbox} style={style}>
                {images.current.map((img, i) => (
                    <div
                      key={i}
                      className={styles.img}
                      style={{ backgroundImage: `url(${img.src})` }}
                    >
                      <div className={styles.title}> {img.title}</div>
                      <div className={styles.subTitle}> {img.subtitle}</div>
                      <Link to={img.pathname} className={styles.link}>
                      <span className={styles.contentBtn}>바로가기 ➜</span>
                      </Link>
                    </div>
                ))}
              </div>
            </div>
            <div className={styles.btn} onClick={() => { moveSlide(1); }}><i className="bi bi-chevron-compact-right"></i></div>
          </div>
          <div className={styles.position}>
            {images.current.map((x, i) => (
              <div
                key={i}
                className={i === current ? `${styles.dot} ${styles.current}` : `${styles.dot}`}
              ></div>
            ))}
          </div>
        </div>      
      </div>
    )
  }
  
export default Issue