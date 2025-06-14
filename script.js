// ReUse Platform JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '#ffffff';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.step, .benefit-card, .category-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Modal functionality
    function createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Animate modal in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
    }

    // Button click handlers
    const heroButtons = document.querySelectorAll('.hero-buttons button');
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            let modalContent = '';
            
            if (buttonText.includes('Descartar')) {
                modalContent = `
                    <form class="reuse-form">
                        <h4>Cadastrar Resíduo para Descarte</h4>
                        <div class="form-group">
                            <label>Tipo de Resíduo:</label>
                            <select required>
                                <option value="">Selecione...</option>
                                <option value="solventes">Solventes Orgânicos</option>
                                <option value="tintas">Tintas e Vernizes</option>
                                <option value="limpeza">Produtos de Limpeza</option>
                                <option value="outros">Outros</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Quantidade (kg):</label>
                            <input type="number" required min="1">
                        </div>
                        <div class="form-group">
                            <label>Localização:</label>
                            <input type="text" required placeholder="Cidade, Estado">
                        </div>
                        <div class="form-group">
                            <label>Descrição:</label>
                            <textarea required placeholder="Descreva as características do resíduo..."></textarea>
                        </div>
                        <div class="form-group">
                            <label>Empresa:</label>
                            <input type="text" required placeholder="Nome da empresa">
                        </div>
                        <div class="form-group">
                            <label>Contato:</label>
                            <input type="email" required placeholder="email@empresa.com">
                        </div>
                        <button type="submit" class="btn-primary">Cadastrar Resíduo</button>
                    </form>
                `;
            } else if (buttonText.includes('Comprar')) {
                modalContent = `
                    <form class="reuse-form">
                        <h4>Buscar Insumos Reciclados</h4>
                        <div class="form-group">
                            <label>Tipo de Insumo Desejado:</label>
                            <select required>
                                <option value="">Selecione...</option>
                                <option value="solventes">Solventes Orgânicos</option>
                                <option value="tintas">Tintas e Vernizes</option>
                                <option value="limpeza">Produtos de Limpeza</option>
                                <option value="outros">Outros</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Quantidade Necessária (kg):</label>
                            <input type="number" required min="1">
                        </div>
                        <div class="form-group">
                            <label>Região de Interesse:</label>
                            <input type="text" required placeholder="Cidade, Estado ou Região">
                        </div>
                        <div class="form-group">
                            <label>Especificações Técnicas:</label>
                            <textarea placeholder="Descreva as especificações necessárias..."></textarea>
                        </div>
                        <div class="form-group">
                            <label>Empresa:</label>
                            <input type="text" required placeholder="Nome da empresa">
                        </div>
                        <div class="form-group">
                            <label>Contato:</label>
                            <input type="email" required placeholder="email@empresa.com">
                        </div>
                        <button type="submit" class="btn-primary">Buscar Insumos</button>
                    </form>
                `;
            }
            
            createModal(buttonText, modalContent);
        });
    });

    // Contact buttons
    const contactButtons = document.querySelectorAll('.contact-buttons button');
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            let modalContent = '';
            
            if (buttonText.includes('Fale Conosco')) {
                modalContent = `
                    <form class="reuse-form">
                        <h4>Entre em Contato</h4>
                        <div class="form-group">
                            <label>Nome:</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>Empresa:</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>Email:</label>
                            <input type="email" required>
                        </div>
                        <div class="form-group">
                            <label>Telefone:</label>
                            <input type="tel">
                        </div>
                        <div class="form-group">
                            <label>Mensagem:</label>
                            <textarea required placeholder="Como podemos ajudar?"></textarea>
                        </div>
                        <button type="submit" class="btn-primary">Enviar Mensagem</button>
                    </form>
                `;
            } else if (buttonText.includes('Demo')) {
                modalContent = `
                    <form class="reuse-form">
                        <h4>Agendar Demonstração</h4>
                        <div class="form-group">
                            <label>Nome do Responsável:</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>Empresa:</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>Email:</label>
                            <input type="email" required>
                        </div>
                        <div class="form-group">
                            <label>Telefone:</label>
                            <input type="tel" required>
                        </div>
                        <div class="form-group">
                            <label>Data Preferida:</label>
                            <input type="date" required>
                        </div>
                        <div class="form-group">
                            <label>Horário Preferido:</label>
                            <select required>
                                <option value="">Selecione...</option>
                                <option value="manha">Manhã (9h-12h)</option>
                                <option value="tarde">Tarde (14h-17h)</option>
                                <option value="noite">Noite (18h-20h)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Observações:</label>
                            <textarea placeholder="Informações adicionais..."></textarea>
                        </div>
                        <button type="submit" class="btn-primary">Agendar Demo</button>
                    </form>
                `;
            }
            
            createModal(buttonText, modalContent);
        });
    });

    // Header buttons
    const headerButtons = document.querySelectorAll('.header-buttons button');
    headerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            let modalContent = '';
            
            if (buttonText.includes('Entrar')) {
                modalContent = `
                    <form class="reuse-form">
                        <h4>Entrar na Plataforma</h4>
                        <div class="form-group">
                            <label>Email:</label>
                            <input type="email" required>
                        </div>
                        <div class="form-group">
                            <label>Senha:</label>
                            <input type="password" required>
                        </div>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox"> Lembrar-me
                            </label>
                        </div>
                        <button type="submit" class="btn-primary">Entrar</button>
                        <p class="form-footer">
                            <a href="#">Esqueceu a senha?</a>
                        </p>
                    </form>
                `;
            } else if (buttonText.includes('Cadastrar')) {
                modalContent = `
                    <form class="reuse-form">
                        <h4>Cadastrar na Plataforma</h4>
                        <div class="form-group">
                            <label>Tipo de Usuário:</label>
                            <select required>
                                <option value="">Selecione...</option>
                                <option value="fornecedor">Fornecedor de Resíduos</option>
                                <option value="comprador">Comprador de Insumos</option>
                                <option value="ambos">Ambos</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Nome da Empresa:</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>CNPJ:</label>
                            <input type="text" required placeholder="00.000.000/0000-00">
                        </div>
                        <div class="form-group">
                            <label>Nome do Responsável:</label>
                            <input type="text" required>
                        </div>
                        <div class="form-group">
                            <label>Email:</label>
                            <input type="email" required>
                        </div>
                        <div class="form-group">
                            <label>Telefone:</label>
                            <input type="tel" required>
                        </div>
                        <div class="form-group">
                            <label>Senha:</label>
                            <input type="password" required>
                        </div>
                        <div class="form-group">
                            <label>Confirmar Senha:</label>
                            <input type="password" required>
                        </div>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" required> Aceito os termos de uso
                            </label>
                        </div>
                        <button type="submit" class="btn-primary">Cadastrar</button>
                    </form>
                `;
            }
            
            createModal(buttonText, modalContent);
        });
    });

    // Form submission handlers
    document.addEventListener('submit', function(e) {
        if (e.target.classList.contains('reuse-form')) {
            e.preventDefault();
            
            // Show success message
            const formData = new FormData(e.target);
            const formType = e.target.querySelector('h4').textContent;
            
            // Simulate form processing
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`${formType} enviado com sucesso! Entraremos em contato em breve.`);
                document.querySelector('.modal-overlay').remove();
            }, 2000);
        }
    });

    // Category card hover effects
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('h4').textContent;
            const modalContent = `
                <div class="category-details">
                    <h4>Ofertas em ${category}</h4>
                    <div class="offers-list">
                        <div class="offer-item">
                            <h5>Resíduo de ${category.toLowerCase()} - Tipo A</h5>
                            <p><strong>Quantidade:</strong> 500kg</p>
                            <p><strong>Localização:</strong> São Paulo, SP</p>
                            <p><strong>Empresa:</strong> Química ABC Ltda.</p>
                            <button class="btn-secondary">Ver Detalhes</button>
                        </div>
                        <div class="offer-item">
                            <h5>Resíduo de ${category.toLowerCase()} - Tipo B</h5>
                            <p><strong>Quantidade:</strong> 250kg</p>
                            <p><strong>Localização:</strong> Rio de Janeiro, RJ</p>
                            <p><strong>Empresa:</strong> Indústria XYZ S.A.</p>
                            <button class="btn-secondary">Ver Detalhes</button>
                        </div>
                        <div class="offer-item">
                            <h5>Resíduo de ${category.toLowerCase()} - Tipo C</h5>
                            <p><strong>Quantidade:</strong> 800kg</p>
                            <p><strong>Localização:</strong> Belo Horizonte, MG</p>
                            <p><strong>Empresa:</strong> Reciclagem 123 Ltda.</p>
                            <button class="btn-secondary">Ver Detalhes</button>
                        </div>
                    </div>
                    <button class="btn-primary" style="margin-top: 20px;">Ver Todas as Ofertas</button>
                </div>
            `;
            
            createModal(`Marketplace - ${category}`, modalContent);
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Add CSS for modals and animations
const modalStyles = `
    <style>
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .modal-content {
            background: white;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #eee;
        }

        .modal-header h3 {
            margin: 0;
            color: var(--color-primary);
        }

        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--color-gray-dark);
        }

        .modal-body {
            padding: 20px;
        }

        .reuse-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
        }

        .form-group label {
            margin-bottom: 5px;
            font-weight: 600;
            color: var(--color-text-dark);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            padding: 10px;
            border: 2px solid var(--color-gray-medium);
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--color-primary);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 80px;
        }

        .checkbox-label {
            flex-direction: row !important;
            align-items: center;
            gap: 8px;
        }

        .checkbox-label input {
            width: auto;
        }

        .form-footer {
            text-align: center;
            margin-top: 15px;
        }

        .form-footer a {
            color: var(--color-primary);
            text-decoration: none;
        }

        .category-details {
            max-height: 400px;
            overflow-y: auto;
        }

        .offers-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin: 20px 0;
        }

        .offer-item {
            background: var(--color-gray-light);
            padding: 15px;
            border-radius: 10px;
            border-left: 4px solid var(--color-accent-2);
        }

        .offer-item h5 {
            color: var(--color-primary);
            margin-bottom: 10px;
        }

        .offer-item p {
            margin: 5px 0;
            font-size: 14px;
        }

        body.loaded {
            opacity: 1;
        }

        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                max-height: 90vh;
            }
            
            .modal-header,
            .modal-body {
                padding: 15px;
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', modalStyles);

