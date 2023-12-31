# Cafe-Share
## Overview

프로젝트 기간: 2023.06.05 ~ 2023.06.29

배포 링크 : <https://react-cafe.vercel.app/>

![로그인 전 헤더 부분](https://github.com/yjy1111/react-cafe/assets/109332470/48e37619-ba98-469b-9884-1961a306115b)


## 프로젝트 소개
> 카페는 우리가 일상에서 많이 방문하는 장소 중 하나입니다.
> 
> 친구들과 소소한 이야기를 할 때에도, 디저트가 먹고 싶은 날에도, 잔잔하게 책을 읽고 싶은 날에도, 카페는 쉽게 방문하는 곳입니다. 
>
> 친구들과 오랜만에 만나 이야기를 나누러 간 카페가 어쩌면 그 동네에서 많은 대학생들이 시험 공부를 하는 장소로 유명하다면, 친구들과 이야기를 마음 편하게 할 수 있을까요?
>
> 이처럼 내가 원하는 주제에 맞는 카페의 정보를 사람들과 공유할 수 있는 사이트를 만들었습니다. 

> <div >
> <img src="https://img.shields.io/badge/HTML-E34F26?style=flat&logo=HTML5&logoColor=white"/>
> <img src="https://img.shields.io/badge/CSS-1572B6?style=flat&logo=CSS3&logoColor=white"/>
> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/>
>  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>   <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/>
> </div>

> <div> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=Firebase&logoColor=white"/> </div>

## 프로젝트 주요 기능
### 1. 메인 화면 

  |<b> 로그인 전 헤더 </b>|<b> 로그인 후 헤더 </b>|
  |:---:|:---:|
  |<img width="100%" alt="로그인전헤더" src="https://github.com/yjy1111/react-cafe/assets/109332470/dc022395-4544-4466-abf7-af072e0c98f6">|<img width="100%" alt="로그인헤더" src="https://github.com/yjy1111/react-cafe/assets/109332470/35596c62-a187-4ffc-b46b-c4b60cf7d2b4"> |

  
- 헤더 부분에는
    
    내가 원하는 `카테고리`를 고를 수 있도록, 구분하여 클릭할 수 있도록 하였습니다. 
    
    제목을 검색할 수 있도록 `검색창`도 만들었습니다.
    
    로그인 전에는 `회원가입`과 `로그인`을 할 수 있도록 하였고, 로그인 후에는 이용자의 `아이디`와 글을 쓸 수 있도록 `글쓰기` 부분과 `로그아웃` 버튼을 만들었습니다.

- 화면의 메인 부분에는
    
    지난 한 달 가장 많이 언급된 카페를 카테고리 별로 하나씩 선정하여 `캐러셀`로 만들었습니다.
    
     `바로가기`를 누르면 해당 카페의 글로 이동합니다.

### 2. 회원가입과 로그인
  #### 1) 회원가입
  ![회원가입창](https://github.com/yjy1111/react-cafe/assets/109332470/8ad8373b-dee9-45b2-a2f1-acabff4a2f91)
  #### 2) 로그인

  |<b> 기본 로그인 </b>|<b> 구글 로그인 </b>|
  |:---:|:---:|
  |<img width="100%" alt="기본 로그인" src="https://github.com/yjy1111/react-cafe/assets/109332470/082e2a42-2b3a-45ac-b5cc-65d7aaa99105">|<img width="100%" alt="구글로그인" src="https://github.com/yjy1111/react-cafe/assets/109332470/9ebe2534-9416-42a9-91dc-a5b49c00d183"> |
  
 



### 3. 글 등록
![글 등록](https://github.com/yjy1111/react-cafe/assets/109332470/c21b325b-092d-4983-ae91-5d42ea121c27)

- `카테고리` / `주소` / `위도와 경도` / `글 작성 칸` / `파일` 로 구성되어 있습니다.

- 글 작성 칸은 React-Quill 라이브러리를 사용하였습니다.
    - React-Quill이란,
    
        리액트 텍스트 에디터로  `줄바꿈`, `글꼴`, `글자색`, `사진`, `영상` 등을 쉽게 적용할 수 있습니다. 
    
        취향에 맞게 커스텀 할 수 있습니다. 
    
        Desktop/ Mobile을 모두 지원합니다.

- 로그인이 되어 있지 않은 경우 , 글을 등록하려 한다면, 로그인이 필요하다는 경고창이 뜨도록 하였습니다.

### 4. 글 목록
![글 목로](https://github.com/yjy1111/react-cafe/assets/109332470/9d1e466d-3b81-4785-875f-0d33f0df8bf1)
- 해당 카테고리를 선택하면, `지역`, `카페 이름`, `글의 내용`, `작성자`, `작성일`이 보이도록 만들었습니다. 

 <p align="center"><img width="70%" alt="페이지네이션" src="https://github.com/yjy1111/react-cafe/assets/109332470/b066ada4-906e-4b81-90ff-6d580e6b58eb"></p>
 
- 페이지네이션이 적용된 경우 한 화면에는 10개의 글이 들어가도록 하였으며, 5 페이지씩 끊었습니다.

### 5. 글 읽기

![글 읽기](https://github.com/yjy1111/react-cafe/assets/109332470/c0d30e24-a645-41dc-9b4e-a8824db36abd)


- 작성자가 글을 등록하면 입력한 위도와 경도를 가지고 지도를 띄워줍니다. 
- 로그인을 하지 않은 경우, 글을 읽을 순 있지만 해당 글에 대한 댓글은 작성하지 못합니다.
- 로그인을 한 경우, 글을 읽을 수도, 댓글을 작성할 수도 있습니다. 
- 또한 자신이 적은 글을 삭제하거나 수정할 수도 있습니다. 
- <span style='background-color:#fff5b1'> 댓글은 글의 하단에서 볼 수 있습니다 </span>



### 6. 글 수정/삭제
- 본인의 글을 삭제하거나 수정하고 싶다면, 글 하단의 `삭제`/ `수정` 버튼을 누르면 됩니다. 
<img width="40%" alt="글 삭제" src="https://github.com/yjy1111/react-cafe/assets/109332470/1af400e2-262f-40cf-b8fa-204d86657bf2"> 

  - 삭제 버튼을 누를 경우
    
      ‘글을 삭제하시겠습니까?’ 라는 창이 뜨고 확인을 누르면, 글이 삭제되며, 기존의 글 목록에서도 지워지게 됩니다.
<img width="40%" alt="글 수" src="https://github.com/yjy1111/react-cafe/assets/109332470/9968c38b-a1d9-4785-9351-474436a3af57">

  - 수정 버튼을 누를 경우
    
      기존의 입력되었던 정보들은 유지되며, 처음부터 작성하지 않고 수정하고 싶은 부분만 수정할 수 있습니다.


### 7. 댓글 달기 
![댓글 달기](https://github.com/yjy1111/react-cafe/assets/109332470/c8948f3e-8ca8-43e9-8cdd-73b5a2ee0c2c)


- 로그인을 한 상태라면, 댓글을 달 수 있습니다.

- 댓글 입력 후 `제출`을 누르면, 댓글 하단에 자신이 적은 댓글이 추가됩니다.




### 8. 댓글 수정/삭제
![댓글 수정괏삭제](https://github.com/yjy1111/react-cafe/assets/109332470/481779df-3c44-414c-84f6-44decfdb930a)

- 댓글을 제출하면, 자신이 적은 댓글에 대해서 `삭제`와 `수정`을 할 수 있습니다. 

  - 삭제 버튼을 누를 경우,
    
      ‘댓글을 삭제하시겠습니까?’ 라는 창이 뜨고 확인을 누르면, 댓글이 삭제되며, 기존의 댓글 목록에서도 지워지게 됩니다.
  - 수정 버튼을 누를 경우,
    
      기존의 입력되었던 정보들은 유지되며, 처음부터 작성하지 않고 수정하고 싶은 부분만 수정할 수 있습니다.

### 9. 검색 기능

![검색 기능](https://github.com/yjy1111/react-cafe/assets/109332470/5cf19e65-3116-40d8-b9d1-7576b3317315)

- 카페의 제목을 검색할 수 있고, 클릭하면 해당 카페의 글로 이동합니다. 
