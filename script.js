document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts-container');
    
    // 从localStorage加载文章
    loadPosts();
    
    // 表单提交事件
    postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        
        if (title && content) {
            const post = {
                id: Date.now(),
                title: title,
                content: content,
                date: new Date().toLocaleString('zh-CN')
            };
            
            // 保存文章到localStorage
            savePost(post);
            
            // 清空表单
            postForm.reset();
            
            // 重新加载文章列表
            loadPosts();
        }
    });
    
    // 保存文章到localStorage
    function savePost(post) {
        let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        posts.unshift(post); // 新文章添加到开头
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    }
    
    // 从localStorage加载文章
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        
        if (posts.length === 0) {
            postsContainer.innerHTML = '<div class="empty-state">暂无文章，快来发表第一篇文章吧！</div>';
            return;
        }
        
        postsContainer.innerHTML = posts.map(post => `
            <article class="post">
                <h3 class="post-title">${escapeHtml(post.title)}</h3>
                <div class="post-content">${escapeHtml(post.content)}</div>
                <div class="post-date">${post.date}</div>
            </article>
        `).join('');
    }
    
    // HTML转义函数，防止XSS攻击
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }
});