// 主要脚本功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化AOS动画库
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });
    
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(26, 60, 94, 0.98)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'rgba(26, 60, 94, 0.95)';
        }
    });
    
    // 移动端导航菜单切换
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // 切换汉堡菜单动画
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
            
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // 如果是移动端，点击导航链接后关闭菜单
                if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    
                    const spans = navToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });
    
    // 返回顶部按钮
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // 数据图表 - 塑料来源饼图
    const plasticSourceCtx = document.getElementById('plasticSourceChart');
    if (plasticSourceCtx) {
        new Chart(plasticSourceCtx, {
            type: 'pie',
            data: {
                labels: ['陆地来源 (河流输入)', '渔业和航运'],
                datasets: [{
                    data: [80, 20],
                    backgroundColor: [
                        '#4a8db7',
                        '#00b8a9'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Open Sans',
                                size: 14
                            },
                            padding: 20
                        }
                    },
                    title: {
                        display: true,
                        text: '海洋塑料污染来源分布',
                        font: {
                            family: 'Montserrat',
                            size: 16,
                            weight: 'bold'
                        },
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // 数据图表 - 区域对比柱状图
    const regionComparisonCtx = document.getElementById('regionComparisonChart');
    if (regionComparisonCtx) {
        new Chart(regionComparisonCtx, {
            type: 'bar',
            data: {
                labels: ['地中海', '东南亚', '北太平洋', '北大西洋', '北极'],
                datasets: [{
                    label: '微塑料浓度指数',
                    data: [116, 100, 85, 70, 20],
                    backgroundColor: [
                        '#4a8db7',
                        '#00b8a9',
                        '#1a3c5e',
                        '#5d7fa3',
                        '#84c7d0'
                    ],
                    borderWidth: 0,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '相对浓度指数',
                            font: {
                                family: 'Open Sans',
                                size: 14
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '海域',
                            font: {
                                family: 'Open Sans',
                                size: 14
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: '各海域微塑料污染程度对比',
                        font: {
                            family: 'Montserrat',
                            size: 16,
                            weight: 'bold'
                        },
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    }
                }
            }
        });
    }
    
    // 问题卡片交互
    const problemCards = document.querySelectorAll('.problem-card');
    problemCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
            
            const content = this.querySelector('.problem-content');
            if (this.classList.contains('expanded')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });
    
    // 数字计数器动画
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 动画持续时间（毫秒）
        const step = target / (duration / 16); // 每16ms更新一次（约60fps）
        
        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // 当元素进入视口时开始计数
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
});
