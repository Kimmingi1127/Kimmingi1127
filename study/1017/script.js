document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 가져오기
    const postsContainer = document.getElementById('posts-container');
    const paginationContainer = document.getElementById('pagination-container');
    const authorInput = document.getElementById('author-input');
    const contentInput = document.getElementById('content-input');
    const submitBtn = document.getElementById('submit-btn');
    const postsPerPageSelect = document.getElementById('posts-per-page-select');

    // 현실적인 더미 데이터 생성
    let posts = [];
    const sampleNames = ['김민준', '이서연', '박도윤', '최지우', '정시우', '강하윤', '조은우', '윤서아', '임지호', '한채원'];
    const sampleContents = [
        '오늘 날씨가 정말 좋네요! 다들 뭐하시나요?',
        '점심 메뉴 추천 받습니다. 뭐 먹을까요?\n1. 김치찌개\n2. 돈까스\n3. 파스타',
        '자바스크립트 공부하는데 너무 어렵네요 ㅠㅠ 팁 좀 주세요.',
        '주말에 다녀온 부산 여행 후기입니다. 광안리 야경이 최고였어요!',
        '요즘 재밌는 넷플릭스 시리즈 있나요? 볼 게 없네요.',
        '퇴근하고 싶다... 아직 2시간이나 남았네',
        '새로 산 키보드 타건감 너무 좋네요. 코딩할 맛 납니다. ⌨️',
        '다들 오늘 하루도 화이팅입니다! 💪',
        '고양이 사진 보고 힐링하세요~ 🐈',
        '게시판 기능이 점점 좋아지네요! 개발자님 감사합니다.'
    ];

    for (let i = 25; i > 0; i--) {
        posts.push({
            id: i,
            author: sampleNames[Math.floor(Math.random() * sampleNames.length)],
            content: sampleContents[Math.floor(Math.random() * sampleContents.length)],
            timestamp: new Date(new Date().getTime() - (25 - i) * 3600 * 1000 * 6).toLocaleString('ko-KR')
        });
    }

    // 페이지네이션 상태
    let currentPage = 1;
    let postsPerPage = 5;

    // 게시글 목록을 화면에 렌더링하는 함수
    function renderPosts() {
        // 컨테이너 비우기
        postsContainer.innerHTML = '';

        // 현재 페이지에 맞는 게시글만 잘라서 사용
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = posts.slice(startIndex, endIndex);

        paginatedPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.dataset.postId = post.id; // 게시글 DOM 요소에 ID 부여

            // 게시글의 제목은 내용의 첫 줄로 가정, 내용이 없으면 '제목 없음'
            const title = post.content.split('\n')[0] || '제목 없음';

            postElement.innerHTML = `
                <div class="post-header">
                    <span class="post-author">${post.author}</span>
                    <span class="post-title">${title}</span>
                    <span class="post-timestamp">${post.timestamp}</span>
                </div>
                <div class="post-body" style="display: none;">
                    <div class="post-content">
                    ${post.content.replace(/\n/g, '<br>')}
                    </div>
                    <div class="post-footer">
                        <button class="edit-btn">수정</button>
                        <button class="delete-btn">삭제</button>
                    </div>
                </div>
            `;
            postsContainer.appendChild(postElement);

            // 제목(헤더) 클릭 시 내용 토글
            const postHeader = postElement.querySelector('.post-header');
            postHeader.addEventListener('click', () => {
                const postBody = postElement.querySelector('.post-body');
                postBody.style.display = postBody.style.display === 'none' ? 'block' : 'none';
            });

            // 삭제 버튼 이벤트 리스너 추가
            const deleteButton = postElement.querySelector('.delete-btn');
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                if (confirm('정말로 삭제하시겠습니까?')) {
                    deletePost(post.id);
                }
            });

            // 수정 버튼 이벤트 리스너 추가
            const editButton = postElement.querySelector('.edit-btn');
            editButton.addEventListener('click', (e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                showEditForm(post.id);
            });
        });
    }

    // 페이지네이션 버튼을 설정하는 함수
    function setupPagination() {
        paginationContainer.innerHTML = '';
        const pageCount = Math.ceil(posts.length / postsPerPage);

        for (let i = 1; i <= pageCount; i++) {
            const pageButton = document.createElement('button');
            pageButton.classList.add('page-btn');
            pageButton.innerText = i;

            if (i === currentPage) {
                pageButton.classList.add('active');
            }

            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderAll();
            });

            paginationContainer.appendChild(pageButton);
        }
    }

    // 수정 폼을 보여주는 함수
    function showEditForm(postId) {
        const postToEdit = posts.find(p => p.id === postId);
        if (!postToEdit) return;

        const postElement = document.querySelector(`.post[data-post-id='${postId}']`);
        const postBody = postElement.querySelector('.post-body');

        // HTML의 <br>을 textarea의 줄바꿈(\n)으로 변환
        const contentForTextarea = postToEdit.content.replace(/<br\s*\/?>/gi, '\n');

        // post-body 부분만 수정 폼으로 교체
        postBody.innerHTML = `
            <div class="post-content-edit">
                <textarea class="edit-textarea">${contentForTextarea}</textarea>
            </div>
            <div class="post-footer">
                <button class="save-btn">저장</button>
                <button class="cancel-btn">취소</button>
            </div>
        `;

        postBody.querySelector('.save-btn').addEventListener('click', () => savePost(postId));
        postBody.querySelector('.cancel-btn').addEventListener('click', () => renderAll());
    }

    // 게시글을 저장하는 함수
    function savePost(postId) {
        const postIndex = posts.findIndex(p => p.id === postId);
        if (postIndex === -1) return;

        const postBody = document.querySelector(`.post[data-post-id='${postId}']`);
        const newContent = postBody.querySelector('.edit-textarea').value;

        // posts 데이터 업데이트
        posts[postIndex].content = newContent;

        // 화면 다시 렌더링
        renderAll();
    }

    // 게시글 삭제 함수
    function deletePost(id) {
        posts = posts.filter(post => post.id !== id);
        renderAll(); // 게시글 목록 다시 렌더링
    }

    // 글쓰기 버튼 클릭 이벤트 처리
    submitBtn.addEventListener('click', () => {
        const author = authorInput.value.trim();
        const content = contentInput.value.trim();

        if (!author || !content) {
            alert('작성자와 내용을 모두 입력해주세요.');
            return;
        }

        // 새 게시글 객체 생성
        const newPost = {
            id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
            author: author,
            content: content,
            timestamp: new Date().toLocaleString('ko-KR') // 현재 시간을 한국 형식으로
        };

        // 새 게시글을 배열의 맨 앞에 추가
        posts.unshift(newPost);

        // 첫 페이지로 이동
        currentPage = 1;

        // 입력 필드 초기화
        authorInput.value = '';
        contentInput.value = '';

        // 게시글 목록 다시 렌더링
        renderAll();
    });

    // 페이지당 게시글 수 변경 이벤트 처리
    postsPerPageSelect.addEventListener('change', (e) => {
        postsPerPage = parseInt(e.target.value, 10);
        currentPage = 1; // 페이지 수를 바꾸면 첫 페이지로 이동
        renderAll();
    });

    // 게시글과 페이지네이션을 모두 렌더링하는 함수
    function renderAll() {
        renderPosts();
        setupPagination();
    }

    // 초기 설정
    postsPerPage = parseInt(postsPerPageSelect.value, 10);
    // 초기 렌더링
    renderAll();
});
