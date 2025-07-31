// Sample property data with real images
const properties = [
    {
        id: 1,
        title: "Luxury Penthouse Suite",
        location: "Banjara Hills, Hyderabad",
        price: "₹2,50,00,000",
        type: "apartment",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        bedrooms: 4,
        bathrooms: 3,
        area: "3500 sq ft",
        badge: "Featured",
        lat: 17.4065,
        lng: 78.4772
    },
    {
        id: 2,
        title: "Modern Villa with Garden",
        location: "Jubilee Hills, Hyderabad",
        price: "₹1,85,00,000",
        type: "villa",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        bedrooms: 5,
        bathrooms: 4,
        area: "4200 sq ft",
        badge: "New",
        lat: 17.4239,
        lng: 78.4738
    },
    {
        id: 3,
        title: "Commercial Office Space",
        location: "HITEC City, Hyderabad",
        price: "₹95,00,000",
        type: "commercial",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        bedrooms: 0,
        bathrooms: 2,
        area: "2800 sq ft",
        badge: "Hot Deal",
        lat: 17.4435,
        lng: 78.3772
    },
    {
        id: 4,
        title: "Elegant Apartment",
        location: "Gachibowli, Hyderabad",
        price: "₹75,00,000",
        type: "apartment",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        bedrooms: 3,
        bathrooms: 2,
        area: "1800 sq ft",
        badge: "Popular",
        lat: 17.4400,
        lng: 78.3489
    },
    {
        id: 5,
        title: "Spacious Family Villa",
        location: "Kondapur, Hyderabad",
        price: "₹1,20,00,000",
        type: "villa",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        bedrooms: 4,
        bathrooms: 3,
        area: "3200 sq ft",
        badge: "Premium",
        lat: 17.4647,
        lng: 78.3639
    },
    {
        id: 6,
        title: "Investment Plot",
        location: "Shamshabad, Hyderabad",
        price: "₹45,00,000",
        type: "plot",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80",
        bedrooms: 0,
        bathrooms: 0,
        area: "2000 sq ft",
        badge: "Investment",
        lat: 17.2403,
        lng: 78.4294
    }
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadProperties();
    initializeNavigation();
    initializeDocumentUpload();
    initializeSignaturePad();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                navMenu.classList.remove('active');
            }
        });
    });

    // Change navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Load and display properties
function loadProperties(filter = 'all') {
    const grid = document.getElementById('properties-grid');
    const filteredProperties = filter === 'all' ? properties : properties.filter(p => p.type === filter);
    
    grid.innerHTML = filteredProperties.map(property => `
        <div class="property-card" data-type="${property.type}">
            <div class="property-image" style="background-image: url('${property.image}')">
                <div class="property-badge">${property.badge}</div>
            </div>
            <div class="property-info">
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </p>
                <div class="property-price">${property.price}</div>
                <div class="property-features">
                    ${property.bedrooms > 0 ? `<span class="feature"><i class="fas fa-bed"></i> ${property.bedrooms} Beds</span>` : ''}
                    ${property.bathrooms > 0 ? `<span class="feature"><i class="fas fa-bath"></i> ${property.bathrooms} Baths</span>` : ''}
                    <span class="feature"><i class="fas fa-ruler-combined"></i> ${property.area}</span>
                </div>
                <div class="property-buttons">
                    <button class="btn-primary" onclick="viewProperty(${property.id})">View Details</button>
                    <button class="btn-secondary" onclick="showOnMap(${property.lat}, ${property.lng})">
                        <i class="fas fa-map-marker-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter properties
function filterProperties(type) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    loadProperties(type);
}

// Google Maps Integration
let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: { lat: 17.3850, lng: 78.4867 },
        styles: [
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
            }
        ]
    });

    properties.forEach(property => {
        const marker = new google.maps.Marker({
            position: { lat: property.lat, lng: property.lng },
            map: map,
            title: property.title,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%233498db"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/%3E%3C/svg%3E',
                scaledSize: new google.maps.Size(40, 40)
            }
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px; max-width: 200px;">
                    <img src="${property.image}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 5px; margin-bottom: 10px;">
                    <h4 style="margin: 0 0 5px 0; color: #2c3e50;">${property.title}</h4>
                    <p style="margin: 0 0 5px 0; color: #7f8c8d; font-size: 12px;">${property.location}</p>
                    <p style="margin: 0; color: #e74c3c; font-weight: bold;">${property.price}</p>
                </div>
            `
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });

        markers.push(marker);
    });
}

function showOnMap(lat, lng) {
    if (map) {
        map.setCenter({ lat: lat, lng: lng });
        map.setZoom(16);
        scrollToSection('map-section');
    }
}

// AI Price Estimator
function estimatePrice() {
    const area = document.getElementById('area').value;
    const propertyType = document.getElementById('propertyType').value;
    const locality = document.getElementById('locality').value;
    const bedrooms = document.getElementById('bedrooms').value;

    if (!area || !locality) {
        showNotification('Please fill all required fields', 'error');
        return;
    }

    // Show loading animation
    const resultDiv = document.getElementById('price-result');
    resultDiv.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 1rem;"></i>
            <p>AI is analyzing market data...</p>
        </div>
    `;
    resultDiv.classList.add('show');

    // Simulate AI processing
    setTimeout(() => {
        const baseRates = {
            apartment: 4500,
            villa: 6000,
            plot: 3000,
            commercial: 5500
        };

        const localityMultiplier = getLocalityMultiplier(locality.toLowerCase());
        const bedroomMultiplier = 1 + (bedrooms - 1) * 0.15;
        const estimatedPrice = area * baseRates[propertyType] * localityMultiplier * bedroomMultiplier;

        const minPrice = estimatedPrice * 0.85;
        const maxPrice = estimatedPrice * 1.15;

        resultDiv.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-chart-line" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <h3>AI Price Estimation</h3>
                <div class="price-value">₹${minPrice.toLocaleString()} - ₹${maxPrice.toLocaleString()}</div>
                <p><strong>Property:</strong> ${area} sq ft ${propertyType} in ${locality}</p>
                <p><strong>Confidence:</strong> 87% (High)</p>
                <small>*Based on recent market transactions and ML algorithms</small>
                <div style="margin-top: 1rem;">
                    <button onclick="downloadReport()" style="background: white; color: #27ae60; border: 1px solid white; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">
                        <i class="fas fa-download"></i> Download Report
                    </button>
                </div>
            </div>
        `;
    }, 2000);
}

function getLocalityMultiplier(locality) {
    const premiumAreas = ['banjara hills', 'jubilee hills', 'gachibowli'];
    const highEndAreas = ['hitech city', 'kondapur', 'madhapur'];
    const standardAreas = ['kukatpally', 'miyapur', 'kompally'];
    
    if (premiumAreas.some(area => locality.includes(area))) return 1.8;
    if (highEndAreas.some(area => locality.includes(area))) return 1.4;
    if (standardAreas.some(area => locality.includes(area))) return 1.1;
    return 1.0;
}

function downloadReport() {
    showNotification('Price estimation report downloaded!', 'success');
}

// Document Upload & E-Signature
function initializeDocumentUpload() {
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('documentUpload');

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.background = 'rgba(52, 152, 219, 0.2)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.background = '';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.background = '';
        const files = e.dataTransfer.files;
        handleFileUpload(files);
    });

    fileInput.addEventListener('change', () => {
        handleFileUpload(fileInput.files);
    });
}

function handleFileUpload(files) {
    const uploadedDocsDiv = document.getElementById('uploaded-docs');
    
    if (files.length === 0) return;

    uploadedDocsDiv.innerHTML = '<h4><i class="fas fa-file-upload"></i> Uploaded Documents:</h4>';
    
    Array.from(files).forEach((file, index) => {
        const docDiv = document.createElement('div');
        docDiv.className = 'uploaded-doc';
        docDiv.innerHTML = `
            <div>
                <i class="fas fa-file-${getFileIcon(file.type)}"></i>
                <span>${file.name}</span>
                <small style="color: #7f8c8d;">(${(file.size / 1024).toFixed(2)} KB)</small>
            </div>
            <div>
                <button onclick="removeDocument(this)" style="background: #e74c3c; color: white; border: none; padding: 0.3rem 0.5rem; border-radius: 3px; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        uploadedDocsDiv.appendChild(docDiv);

        // Simulate upload progress
        setTimeout(() => {
            docDiv.style.background = '#d5f4e6';
            docDiv.innerHTML += '<small style="color: #27ae60; margin-left: 10px;">✓ Uploaded</small>';
        }, (index + 1) * 500);
    });

    showNotification(`${files.length} document(s) uploaded successfully!`, 'success');
}

function getFileIcon(type) {
    if (type.includes('pdf')) return 'pdf';
    if (type.includes('image')) return 'image';
    if (type.includes('doc')) return 'word';
    return 'file';
}

function removeDocument(button) {
    button.closest('.uploaded-doc').remove();
    showNotification('Document removed', 'info');
}

// E-Signature Implementation
let signaturePad;

function initializeSignaturePad() {
    const canvas = document.getElementById('signature-pad');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', handleTouch, { passive: false });
    canvas.addEventListener('touchmove', handleTouch, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = getCoordinates(e);
    }

    function draw(e) {
        if (!isDrawing) return;
        
        const [currentX, currentY] = getCoordinates(e);
        
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        
        [lastX, lastY] = [currentX, currentY];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function getCoordinates(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        return [
            (e.clientX - rect.left) * scaleX,
            (e.clientY - rect.top) * scaleY
        ];
    }

    function handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                        e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }
}

function clearSignature() {
    const canvas = document.getElementById('signature-pad');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    showNotification('Signature cleared', 'info');
}

function saveSignature() {
    const canvas = document.getElementById('signature-pad');
    const ctx = canvas.getContext('2d');
    
    // Check if canvas is empty
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const isEmpty = !imageData.data.some(channel => channel !== 0);
    
    if (isEmpty) {
        showNotification('Please provide a signature first', 'error');
        return;
    }
    
    // Add timestamp and user info to signature
    ctx.font = '12px Poppins';
    ctx.fillStyle = '#7f8c8d';
    ctx.fillText(`Signed on: ${new Date().toLocaleString()}`, 10, canvas.height - 10);
    
    const dataURL = canvas.toDataURL('image/png');
    
    // Create download link
    const link = document.createElement('a');
    link.download = `signature_${Date.now()}.png`;
    link.href = dataURL;
    link.click();
    
    showNotification('Signature saved successfully!', 'success');
}

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function viewProperty(id) {
    const property = properties.find(p => p.id === id);
    if (property) {
        showNotification(`Opening details for ${property.title}...`, 'info');
        // In a real app, this would open a detailed property page
        setTimeout(() => {
            alert(`Property Details:\n\nTitle: ${property.title}\nLocation: ${property.location}\nPrice: ${property.price}\nArea: ${property.area}`);
        }, 500);
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.querySelector('button').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.2rem;
        margin-left: auto;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
