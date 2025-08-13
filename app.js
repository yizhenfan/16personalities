class PersonalityTest {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.selectedMode = 'complex'; // 默认复杂模式
        this.scores = {
            E: 0, I: 0,
            S: 0, N: 0, 
            T: 0, F: 0,
            J: 0, P: 0
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.showWelcomeScreen();
    }

    bindEvents() {
        document.getElementById('start-test').addEventListener('click', () => {
            this.startTest();
        });

        document.getElementById('restart-test').addEventListener('click', () => {
            this.restartTest();
        });

        const optionButtons = document.querySelectorAll('.option-circle');
        optionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.selectAnswer(e.target);
            });
        });

        document.getElementById('prev-btn').addEventListener('click', () => {
            this.previousQuestion();
        });

        // 绑定模式选择事件
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectMode(e.currentTarget);
            });
        });

        // 绑定分享和保存功能
        document.getElementById('share-result').addEventListener('click', () => {
            this.shareResult();
        });

        document.getElementById('save-image').addEventListener('click', () => {
            this.saveResultAsImage();
        });

        // 绑定社交媒体分享按钮
        document.getElementById('share-wechat').addEventListener('click', () => {
            this.shareToWechat();
        });

        document.getElementById('share-qq').addEventListener('click', () => {
            this.shareToQQ();
        });

        document.getElementById('share-weibo').addEventListener('click', () => {
            this.shareToWeibo();
        });

        document.getElementById('copy-link').addEventListener('click', () => {
            this.copyShareLink();
        });

        // 检查是否通过分享链接访问
        this.checkSharedLink();

    }

    selectMode(card) {
        // 移除所有卡片的激活状态
        document.querySelectorAll('.mode-card').forEach(c => {
            c.classList.remove('active');
        });
        
        // 激活选中的卡片
        card.classList.add('active');
        
        // 保存选择的模式
        this.selectedMode = card.dataset.mode;
    }

    showWelcomeScreen() {
        this.hideAllScreens();
        document.getElementById('welcome-screen').classList.add('active');
    }

    startTest() {
        // 根据选择的模式设置题库
        setQuestionMode(this.selectedMode);
        
        this.hideAllScreens();
        document.getElementById('test-screen').classList.add('active');
        document.getElementById('total-questions').textContent = questions.length;
        this.showQuestion();
    }

    showQuestion() {
        const question = questions[this.currentQuestion];
        document.getElementById('question-text').textContent = question.text;
        document.getElementById('current-question').textContent = this.currentQuestion + 1;
        
        // Update progress bar
        const progress = ((this.currentQuestion) / questions.length) * 100;
        document.getElementById('progress').style.width = progress + '%';
        
        // Show/hide previous button
        const prevBtn = document.getElementById('prev-btn');
        if (this.currentQuestion === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-block';
        }
        
        // Clear previous selection and restore previous answer if exists
        document.querySelectorAll('.option-circle').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // If this question was already answered, show the previous selection
        if (this.answers[this.currentQuestion]) {
            const previousValue = this.answers[this.currentQuestion].value;
            const previousButton = document.querySelector(`[data-value="${previousValue}"]`);
            if (previousButton) {
                previousButton.classList.add('selected');
            }
        }
    }

    selectAnswer(button) {
        // Remove selection from all buttons
        document.querySelectorAll('.option-circle').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Select current button
        button.classList.add('selected');
        
        const value = parseInt(button.dataset.value);
        this.recordAnswer(value);
        
        // Auto advance after a short delay
        setTimeout(() => {
            this.nextQuestion();
        }, 500);
    }

    recordAnswer(value) {
        const question = questions[this.currentQuestion];
        
        // If this question was already answered, remove its previous score contribution
        if (this.answers[this.currentQuestion]) {
            this.removeScore(question, this.answers[this.currentQuestion].value);
        }
        
        this.answers[this.currentQuestion] = {
            question: this.currentQuestion,
            value: value,
            dimension: question.dimension,
            direction: question.direction
        };
        
        // Calculate score contribution
        this.calculateScore(question, value);
    }

    removeScore(question, value) {
        const dimension = question.dimension;
        const direction = question.direction;
        
        // Convert 1-7 scale to -3 to +3 scale for easier calculation
        const score = value - 4;
        
        // Remove the previous score contribution (相反操作)
        if (dimension === 'EI') {
            if (direction === 'E') {
                this.scores.E -= score;
            } else {
                this.scores.I -= score; // 修复：应该使用减法（与calculateScore相反）
            }
        } else if (dimension === 'SN') {
            if (direction === 'S') {
                this.scores.S -= score;
            } else {
                this.scores.N -= score; // 修复：应该使用减法
            }
        } else if (dimension === 'TF') {
            if (direction === 'T') {
                this.scores.T -= score;
            } else {
                this.scores.F -= score; // 修复：应该使用减法
            }
        } else if (dimension === 'JP') {
            if (direction === 'J') {
                this.scores.J -= score;
            } else {
                this.scores.P -= score; // 修复：应该使用减法
            }
        }
    }

    calculateScore(question, value) {
        const dimension = question.dimension;
        const direction = question.direction;
        
        // Convert 1-7 scale to -3 to +3 scale for easier calculation
        const score = value - 4;
        
        if (dimension === 'EI') {
            if (direction === 'E') {
                this.scores.E += score;
            } else {
                this.scores.I += score; // 修复：应该使用加法
            }
        } else if (dimension === 'SN') {
            if (direction === 'S') {
                this.scores.S += score;
            } else {
                this.scores.N += score; // 修复：应该使用加法
            }
        } else if (dimension === 'TF') {
            if (direction === 'T') {
                this.scores.T += score;
            } else {
                this.scores.F += score; // 修复：应该使用加法
            }
        } else if (dimension === 'JP') {
            if (direction === 'J') {
                this.scores.J += score;
            } else {
                this.scores.P += score; // 修复：应该使用加法
            }
        }
    }

    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion >= questions.length) {
            this.showResults();
        } else {
            this.showQuestion();
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showQuestion();
        }
    }

    showResults() {
        this.hideAllScreens();
        document.getElementById('result-screen').classList.add('active');
        
        // Determine personality type
        const personalityType = this.determinePersonalityType();
        this.displayResults(personalityType);
    }

    determinePersonalityType() {
        let type = '';
        
        // E vs I
        type += this.scores.E > this.scores.I ? 'E' : 'I';
        
        // S vs N  
        type += this.scores.S > this.scores.N ? 'S' : 'N';
        
        // T vs F
        type += this.scores.T > this.scores.F ? 'T' : 'F';
        
        // J vs P
        type += this.scores.J > this.scores.P ? 'J' : 'P';
        
        return type;
    }

    displayResults(personalityType) {
        const personality = personalities[personalityType];
        
        // Display personality type and name
        document.getElementById('personality-code').textContent = personalityType;
        document.getElementById('personality-name').textContent = personality.name;
        document.getElementById('personality-desc').textContent = personality.description;
        
        // Display detailed analysis
        document.getElementById('career-suggestions').textContent = personality.careers;
        document.getElementById('growth-advice').textContent = personality.growth;
        document.getElementById('relationship-traits').textContent = personality.relationships;
        
        // Display dimension scores
        this.displayDimensionScores();
    }

    displayDimensionScores() {
        // 更科学的百分比计算方法
        // 基于标准化的强度计算，避免极端值
        
        // E/I dimension
        const eiStrength = this.calculateDimensionStrength(this.scores.E, this.scores.I);
        const eDominant = this.scores.E > this.scores.I;
        this.updateDimensionBar('ei', eiStrength, eDominant ? 'E' : 'I', 
                               eDominant ? Math.round(eiStrength) + '% 外向' : Math.round(eiStrength) + '% 内向');
        
        // S/N dimension  
        const snStrength = this.calculateDimensionStrength(this.scores.S, this.scores.N);
        const sDominant = this.scores.S > this.scores.N;
        this.updateDimensionBar('sn', snStrength, sDominant ? 'S' : 'N',
                               sDominant ? Math.round(snStrength) + '% 实感' : Math.round(snStrength) + '% 直觉');
        
        // T/F dimension
        const tfStrength = this.calculateDimensionStrength(this.scores.T, this.scores.F);
        const tDominant = this.scores.T > this.scores.F;
        this.updateDimensionBar('tf', tfStrength, tDominant ? 'T' : 'F',
                               tDominant ? Math.round(tfStrength) + '% 思考' : Math.round(tfStrength) + '% 情感');
        
        // J/P dimension
        const jpStrength = this.calculateDimensionStrength(this.scores.J, this.scores.P);
        const jDominant = this.scores.J > this.scores.P;
        this.updateDimensionBar('jp', jpStrength, jDominant ? 'J' : 'P',
                               jDominant ? Math.round(jpStrength) + '% 判断' : Math.round(jpStrength) + '% 知觉');
    }

    calculateDimensionStrength(score1, score2) {
        // 如果两个分数都是0（没有回答相关题目），返回50%
        if (score1 === 0 && score2 === 0) {
            return 50;
        }
        
        // 计算总的"倾向强度" - 两个分数的绝对值之和
        const totalAbsolute = Math.abs(score1) + Math.abs(score2);
        
        // 如果总强度为0，返回50%（完全中性）
        if (totalAbsolute === 0) {
            return 50;
        }
        
        // 计算差异强度
        const difference = Math.abs(score1 - score2);
        
        // 将差异转换为百分比强度
        // 使用开方函数来减缓极端值，使结果更加合理
        let strengthRatio = difference / totalAbsolute;
        strengthRatio = Math.sqrt(strengthRatio); // 开方减缓
        
        // 转换为50%-100%的范围
        const percentage = 50 + (strengthRatio * 50);
        
        // 确保结果在合理范围内
        return Math.max(50, Math.min(95, percentage)); // 最高95%而非100%
    }

    updateDimensionBar(dimension, percentage, dominantType, label) {
        const bar = document.getElementById(`${dimension}-bar`);
        const labelElement = document.getElementById(`${dimension}-label`);
        
        // If the second type is dominant, show from the right
        if (dimension === 'ei' && dominantType === 'I') {
            bar.style.width = (100 - percentage) + '%';
            bar.style.marginLeft = 'auto';
            bar.style.marginRight = '0';
        } else if (dimension === 'sn' && dominantType === 'N') {
            bar.style.width = (100 - percentage) + '%';
            bar.style.marginLeft = 'auto';
            bar.style.marginRight = '0';
        } else if (dimension === 'tf' && dominantType === 'F') {
            bar.style.width = (100 - percentage) + '%';
            bar.style.marginLeft = 'auto';
            bar.style.marginRight = '0';
        } else if (dimension === 'jp' && dominantType === 'P') {
            bar.style.width = (100 - percentage) + '%';
            bar.style.marginLeft = 'auto';
            bar.style.marginRight = '0';
        } else {
            bar.style.width = percentage + '%';
            bar.style.marginLeft = '0';
            bar.style.marginRight = 'auto';
        }
        
        labelElement.textContent = label;
    }

    hideAllScreens() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
    }

    restartTest() {
        this.currentQuestion = 0;
        this.answers = [];
        this.selectedMode = 'complex'; // 重置为默认模式
        this.scores = {
            E: 0, I: 0,
            S: 0, N: 0,
            T: 0, F: 0,
            J: 0, P: 0
        };
        
        // 重置模式选择卡片状态
        document.querySelectorAll('.mode-card').forEach(card => {
            card.classList.remove('active');
            if (card.dataset.mode === 'complex') {
                card.classList.add('active');
            }
        });
        
        this.showWelcomeScreen();
    }

    checkSharedLink() {
        const urlParams = new URLSearchParams(window.location.search);
        const sharedType = urlParams.get('shared');
        const ref = urlParams.get('ref');
        
        if (sharedType && ref === 'share') {
            // 通过分享链接访问
            const personality = personalities[sharedType];
            if (personality) {
                this.showSharedResultPrompt(sharedType, personality);
            }
        }
    }

    showSharedResultPrompt(personalityType, personality) {
        // 创建分享提示横幅
        const banner = document.createElement('div');
        banner.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 20px;
            text-align: center;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            animation: slideDown 0.5s ease-out;
        `;
        
        banner.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <strong>🎉 朋友分享了他们的测试结果：${personalityType} - ${personality.name}！</strong>
                <br>
                <span style="font-size: 0.9rem; opacity: 0.9;">你也来测测你的人格类型吧！</span>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 15px;
                    margin-left: 15px;
                    cursor: pointer;
                    font-size: 0.8rem;
                ">关闭</button>
            </div>
        `;
        
        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from {
                    transform: translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(banner);
        
        // 5秒后自动隐藏
        setTimeout(() => {
            if (banner.parentNode) {
                banner.style.animation = 'slideUp 0.5s ease-out forwards';
                banner.style.animationFillMode = 'forwards';
                setTimeout(() => banner.remove(), 500);
            }
        }, 5000);
        
        // 添加向上滑动动画
        style.textContent += `
            @keyframes slideUp {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(-100%);
                    opacity: 0;
                }
            }
        `;
        
        // 调整页面顶部间距
        document.body.style.paddingTop = '80px';
        
        // 横幅关闭时恢复间距
        const originalRemove = banner.remove.bind(banner);
        banner.remove = function() {
            document.body.style.paddingTop = '0';
            originalRemove();
        };
    }

    shareResult() {
        const personalityType = this.determinePersonalityType();
        const personality = personalities[personalityType];
        
        // 生成带参数的个性化链接
        const baseUrl = window.location.origin + window.location.pathname;
        const shareUrl = `${baseUrl}?shared=${personalityType}&ref=share`;
        
        // 生成吸引人的分享内容
        const shareTitle = '我的16型人格测试结果出炉！';
        const shareText = `🎯 我的人格类型：${personalityType} - ${personality.name}\n\n✨ ${personality.description}\n\n💼 适合职业：${personality.careers.split('、').slice(0, 3).join('、')}等\n\n🔗 你也来测测你的人格类型吧！`;
        
        // 检查是否支持Web Share API
        if (navigator.share) {
            navigator.share({
                title: shareTitle,
                text: shareText,
                url: shareUrl
            }).catch(err => {
                console.log('分享失败:', err);
                this.fallbackShare(shareText, shareUrl);
            });
        } else {
            this.fallbackShare(shareText, shareUrl);
        }
    }

    fallbackShare(shareText, shareUrl) {
        // 将链接也加入分享内容
        const fullShareText = `${shareText}\n\n${shareUrl}`;
        
        // 复制到剪贴板作为备选方案
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(fullShareText).then(() => {
                alert('结果和链接已复制到剪贴板！您可以粘贴到任何地方分享。');
            }).catch(() => {
                this.showShareModal(fullShareText, shareUrl);
            });
        } else {
            this.showShareModal(fullShareText, shareUrl);
        }
    }

    showShareModal(shareText, shareUrl) {
        // 创建模态框显示分享文本
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center;
            z-index: 9999; padding: 20px;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 100%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        
        content.innerHTML = `
            <h3 style="margin-top: 0; color: #333;">分享我的测试结果</h3>
            <textarea style="width: 100%; height: 120px; padding: 10px; border: 2px solid #ddd; border-radius: 8px; font-family: inherit; resize: none;" readonly>${shareText}</textarea>
            <div style="margin-top: 20px; text-align: right;">
                <button style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; margin-left: 10px;" onclick="this.closest('.modal').remove()">关闭</button>
            </div>
        `;
        
        modal.className = 'modal';
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        // 选中文本
        const textarea = content.querySelector('textarea');
        textarea.select();
        textarea.setSelectionRange(0, 99999); // 移动设备兼容
        
        // 点击模态框外部关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    async saveResultAsImage() {
        try {
            // 显示加载提示
            const saveBtn = document.getElementById('save-image');
            const originalText = saveBtn.textContent;
            saveBtn.textContent = '生成中...';
            saveBtn.disabled = true;
            
            // 获取结果区域
            const resultContent = document.querySelector('.result-content');
            
            // 临时隐藏按钮以获得更好的截图效果
            const actionsDiv = document.querySelector('.result-actions');
            actionsDiv.style.display = 'none';
            
            // 使用html2canvas生成图片
            const canvas = await html2canvas(resultContent, {
                backgroundColor: '#ffffff',
                scale: 2, // 提高图片质量
                useCORS: true,
                logging: false,
                width: resultContent.offsetWidth,
                height: resultContent.offsetHeight
            });
            
            // 恢复按钮显示
            actionsDiv.style.display = '';
            saveBtn.textContent = originalText;
            saveBtn.disabled = false;
            
            // 转换为图片并下载
            canvas.toBlob((blob) => {
                const personalityType = this.determinePersonalityType();
                const personality = personalities[personalityType];
                
                const link = document.createElement('a');
                link.download = `我的人格类型_${personalityType}_${personality.name}.png`;
                link.href = URL.createObjectURL(blob);
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                URL.revokeObjectURL(link.href);
                
                // 成功提示
                alert('图片已保存到下载文件夹！');
            }, 'image/png');
            
        } catch (error) {
            console.error('保存图片失败:', error);
            alert('保存图片失败，请重试。');
            
            // 恢复按钮状态
            const saveBtn = document.getElementById('save-image');
            saveBtn.textContent = '保存图片';
            saveBtn.disabled = false;
            
            // 恢复按钮显示
            document.querySelector('.result-actions').style.display = '';
        }
    }

    shareToWechat() {
        const personalityType = this.determinePersonalityType();
        const personality = personalities[personalityType];
        const baseUrl = window.location.origin + window.location.pathname;
        const shareUrl = `${baseUrl}?shared=${personalityType}&ref=wechat`;
        
        const shareText = `🎯 我在16型人格测试中是：${personalityType} - ${personality.name}！\n\n✨ ${personality.description}\n\n💼 我适合的职业：${personality.careers.split('、').slice(0, 3).join('、')}等\n\n🔗 你也来测测看你是什么人格类型吧！`;
        
        // 微信不支持直接分享，显示二维码或提示用户手动分享
        this.showWechatShareModal(shareText, shareUrl);
    }

    shareToQQ() {
        const personalityType = this.determinePersonalityType();
        const personality = personalities[personalityType];
        const baseUrl = window.location.origin + window.location.pathname;
        const shareUrl = `${baseUrl}?shared=${personalityType}&ref=qq`;
        
        const title = `我的16型人格测试结果：${personalityType} - ${personality.name}`;
        const summary = `${personality.description.substring(0, 100)}... 快来测试你的人格类型！`;
        
        // QQ分享链接
        const qqShareUrl = `http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}&site=${encodeURIComponent('16型人格测试')}`;
        
        window.open(qqShareUrl, '_blank', 'width=600,height=400');
    }

    shareToWeibo() {
        const personalityType = this.determinePersonalityType();
        const personality = personalities[personalityType];
        const baseUrl = window.location.origin + window.location.pathname;
        const shareUrl = `${baseUrl}?shared=${personalityType}&ref=weibo`;
        
        const shareText = `🎯 我的16型人格测试结果：${personalityType} - ${personality.name}！${personality.description.substring(0, 80)}... 你也来测试看看吧！`;
        
        // 微博分享链接
        const weiboShareUrl = `http://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}&pic=&appkey=`;
        
        window.open(weiboShareUrl, '_blank', 'width=600,height=400');
    }

    async copyShareLink() {
        const personalityType = this.determinePersonalityType();
        const personality = personalities[personalityType];
        const baseUrl = window.location.origin + window.location.pathname;
        const shareUrl = `${baseUrl}?shared=${personalityType}&ref=copy`;
        
        const shareText = `🎯 我的16型人格测试结果：${personalityType} - ${personality.name}！\n\n✨ ${personality.description}\n\n💼 适合职业：${personality.careers.split('、').slice(0, 3).join('、')}等\n\n🔗 测试链接：${shareUrl}\n\n你也来测试看看你是什么人格类型吧！`;
        
        try {
            await navigator.clipboard.writeText(shareText);
            this.showCopySuccess();
        } catch (err) {
            // 备选方案：选中文本
            this.showShareModal(shareText, shareUrl);
        }
    }

    showWechatShareModal(shareText, shareUrl) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center;
            z-index: 9999; padding: 20px;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: white; padding: 30px; border-radius: 15px; max-width: 500px; width: 100%;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3); text-align: center;
        `;
        
        content.innerHTML = `
            <div style="color: #07c160; font-size: 2rem; margin-bottom: 1rem;">💬</div>
            <h3 style="margin-bottom: 1rem; color: #333;">分享到微信</h3>
            <p style="color: #666; margin-bottom: 1.5rem; line-height: 1.5;">复制下方链接和文案，在微信中分享给好友或发朋友圈</p>
            <textarea style="width: 100%; height: 150px; padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; font-family: inherit; resize: none; font-size: 14px;" readonly>${shareText}\n\n${shareUrl}</textarea>
            <div style="margin-top: 20px;">
                <button id="copy-wechat-text" style="padding: 12px 24px; background: #07c160; color: white; border: none; border-radius: 8px; cursor: pointer; margin-right: 10px; font-size: 14px;">📋 复制内容</button>
                <button style="padding: 12px 24px; background: #f0f0f0; color: #333; border: none; border-radius: 8px; cursor: pointer; font-size: 14px;" onclick="this.closest('.modal').remove()">关闭</button>
            </div>
        `;
        
        modal.className = 'modal';
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        // 复制功能
        content.querySelector('#copy-wechat-text').addEventListener('click', async () => {
            const textarea = content.querySelector('textarea');
            try {
                await navigator.clipboard.writeText(textarea.value);
                const btn = content.querySelector('#copy-wechat-text');
                btn.textContent = '✅ 已复制';
                btn.style.background = '#52c41a';
                setTimeout(() => {
                    btn.textContent = '📋 复制内容';
                    btn.style.background = '#07c160';
                }, 2000);
            } catch (err) {
                textarea.select();
                textarea.setSelectionRange(0, 99999);
            }
        });
        
        // 点击模态框外部关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    showCopySuccess() {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: #52c41a; color: white; padding: 15px 25px; border-radius: 8px;
            z-index: 10000; font-size: 16px; font-weight: 500;
            box-shadow: 0 4px 20px rgba(82, 196, 26, 0.3);
            animation: fadeInOut 2s ease-in-out forwards;
        `;
        
        toast.textContent = '✅ 链接和文案已复制到剪贴板！';
        
        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
            style.remove();
        }, 2000);
    }
}

// Initialize the test when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PersonalityTest();
});