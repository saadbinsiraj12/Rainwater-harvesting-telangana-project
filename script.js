// Enhanced Rain Animation
function createRain() {
    const rainContainer = document.getElementById('rain');
    const rainCount = 150;
    
    for (let i = 0; i < rainCount; i++) {
        const drop = document.createElement('div');
        drop.classList.add('drop');
        
        // Random properties for each rain drop
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 0.5 + 0.5;
        const animationDelay = Math.random() * 2;
        const dropHeight = Math.random() * 15 + 10;
        const opacity = Math.random() * 0.3 + 0.1;
        
        drop.style.left = `${left}%`;
        drop.style.animationDuration = `${animationDuration}s`;
        drop.style.animationDelay = `${animationDelay}s`;
        drop.style.height = `${dropHeight}px`;
        drop.style.opacity = opacity;
        
        // Create splash effect
        if (Math.random() > 0.7) {
            drop.style.animationDuration = `${animationDuration * 1.5}s`;
            drop.style.animationDelay = `${animationDelay * 1.5}s`;
        }
        
        rainContainer.appendChild(drop);
    }
}

// Header scroll effect
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Modal Handling
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const closeButtons = document.querySelectorAll('.close-modal');

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

registerBtn.addEventListener('click', () => {
    registerModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        registerModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (e.target === registerModal) {
        registerModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Login Form Handling
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Hardcoded login credentials
    if (email === 'saadbinsiraj12@gmail.com' && password === '905298') {
        loginError.style.display = 'none';
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Redirect to technical analysis section
        window.location.href = '#analysis';
    } else {
        loginError.style.display = 'block';
    }
});

// Register Form Handling
const registerForm = document.getElementById('register-form');
const registerError = document.getElementById('register-error');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    
    if (password !== confirm) {
        registerError.style.display = 'block';
    } else {
        registerError.style.display = 'none';
        // Show that registration slots are full
        alert('Sorry, registration slots are currently full. Please try again later.');
        registerModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Technical Analysis Calculator
const calculateBtn = document.getElementById('calculate-btn');
const resultsDiv = document.getElementById('results');

// District rainfall data (simplified for demonstration)
const districtData = {
    'Hyderabad': { rainfall: 750, costPerSqFt: 50 },
    'Rangareddy': { rainfall: 800, costPerSqFt: 45 },
    'Medchal': { rainfall: 850, costPerSqFt: 40 },
    'Sangareddy': { rainfall: 780, costPerSqFt: 42 },
    'Vikarabad': { rainfall: 900, costPerSqFt: 38 },
    'Mahabubnagar': { rainfall: 650, costPerSqFt: 48 },
    'Nagarkurnool': { rainfall: 700, costPerSqFt: 46 },
    'Wanaparthy': { rainfall: 680, costPerSqFt: 47 },
    'Jogulamba': { rainfall: 720, costPerSqFt: 44 },
    'Nalgonda': { rainfall: 730, costPerSqFt: 43 },
    'Suryapet': { rainfall: 740, costPerSqFt: 42 },
    'Yadadri': { rainfall: 760, costPerSqFt: 41 },
    'Medak': { rainfall: 770, costPerSqFt: 40 },
    'Siddipet': { rainfall: 790, costPerSqFt: 39 },
    'Kamareddy': { rainfall: 810, costPerSqFt: 38 },
    'Adilabad': { rainfall: 950, costPerSqFt: 35 },
    'Nirmal': { rainfall: 920, costPerSqFt: 36 },
    'Mancherial': { rainfall: 930, costPerSqFt: 36 },
    'Komaram Bheem': { rainfall: 940, costPerSqFt: 35 },
    'Karimnagar': { rainfall: 880, costPerSqFt: 37 },
    'Peddapalli': { rainfall: 870, costPerSqFt: 38 },
    'Jayashankar': { rainfall: 890, costPerSqFt: 37 },
    'Bhadradri': { rainfall: 910, costPerSqFt: 36 },
    'Khammam': { rainfall: 860, costPerSqFt: 38 },
    'Warangal Urban': { rainfall: 830, costPerSqFt: 39 },
    'Warangal Rural': { rainfall: 840, costPerSqFt: 39 },
    'Jangaon': { rainfall: 820, costPerSqFt: 40 },
    'Mahbubabad': { rainfall: 850, costPerSqFt: 39 }
};

// Roof type coefficients
const roofCoefficients = {
    'concrete': 0.85,
    'tiled': 0.75,
    'metal': 0.9,
    'asbestos': 0.8,
    'thatched': 0.6
};

calculateBtn.addEventListener('click', () => {
    const district = document.getElementById('district').value;
    const roofType = document.getElementById('roof-type').value;
    const area = parseFloat(document.getElementById('area').value);
    const familySize = parseInt(document.getElementById('family').value);
    
    if (!district || !roofType || isNaN(area) || isNaN(familySize)) {
        alert('Please fill in all fields with valid values');
        return;
    }
    
    const districtInfo = districtData[district];
    const roofCoeff = roofCoefficients[roofType];
    
    // Calculations
    const annualRainfall = districtInfo.rainfall; // mm
    const rainfallMeters = annualRainfall / 1000; // convert to meters
    const areaSqMeters = area * 0.0929; // convert sq ft to sq meters
    
    // Potential harvest in liters
    const potentialHarvest = rainfallMeters * areaSqMeters * roofCoeff * 1000;
    
    // System cost estimation
    const systemCost = area * districtInfo.costPerSqFt;
    
    // Water savings (assuming 100 liters per person per day)
    const dailyRequirement = familySize * 100;
    const annualRequirement = dailyRequirement * 365;
    const percentageCovered = (potentialHarvest / annualRequirement) * 100;
    
    // Payback period (assuming water cost of ₹10 per 1000 liters)
    const annualSavings = (potentialHarvest / 1000) * 10;
    const paybackYears = systemCost / annualSavings;
    
    // Display results
    document.getElementById('rainfall-amount').textContent = `Annual Rainfall in ${district}: ${annualRainfall} mm`;
    document.getElementById('harvest-potential').textContent = `Potential Annual Harvest: ${potentialHarvest.toFixed(0)} liters`;
    document.getElementById('water-savings').textContent = `This can cover ${percentageCovered.toFixed(1)}% of your family's annual water needs`;
    document.getElementById('system-cost').textContent = `Estimated System Cost: ₹${systemCost.toFixed(0)}`;
    document.getElementById('payback-period').textContent = `Payback Period: ${paybackYears.toFixed(1)} years`;
    
    let recommendation = '';
    if (percentageCovered > 50) {
        recommendation = 'Highly recommended - your location has excellent potential for rainwater harvesting.';
    } else if (percentageCovered > 30) {
        recommendation = 'Recommended - rainwater harvesting can significantly reduce your water bills.';
    } else {
        recommendation = 'Consider other water conservation methods as rainfall in your area is limited.';
    }
    document.getElementById('recommendation').textContent = `Recommendation: ${recommendation}`;
    
    resultsDiv.style.display = 'block';
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Rainfall Map Interaction - Fixed Version
const stateAreas = document.querySelectorAll('.state-area');
const districtSelector = document.getElementById('district-selector');
const districtSelect = document.getElementById('district-select');
const rainfallDataDiv = document.getElementById('rainfall-data');

// Sample data for demonstration
const stateDistrictData = {
    'Telangana': {
        districts: ['Hyderabad', 'Rangareddy', 'Medchal', 'Sangareddy', 'Vikarabad'],
        data: {
            'Hyderabad': {
                annualRainfall: '750 mm',
                monsoonRainfall: '550 mm',
                rainyDays: '45 days',
                waterWastage: '12,500 million liters',
                potentialSavings: '9,800 million liters'
            },
            'Rangareddy': {
                annualRainfall: '800 mm',
                monsoonRainfall: '600 mm',
                rainyDays: '50 days',
                waterWastage: '10,200 million liters',
                potentialSavings: '8,500 million liters'
            },
            'Medchal': {
                annualRainfall: '850 mm',
                monsoonRainfall: '650 mm',
                rainyDays: '55 days',
                waterWastage: '9,800 million liters',
                potentialSavings: '8,200 million liters'
            },
            'Sangareddy': {
                annualRainfall: '780 mm',
                monsoonRainfall: '580 mm',
                rainyDays: '48 days',
                waterWastage: '8,500 million liters',
                potentialSavings: '7,000 million liters'
            },
            'Vikarabad': {
                annualRainfall: '900 mm',
                monsoonRainfall: '700 mm',
                rainyDays: '60 days',
                waterWastage: '7,200 million liters',
                potentialSavings: '6,500 million liters'
            }
        }
    },
    'Andhra Pradesh': {
        districts: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati'],
        data: {
            'Visakhapatnam': {
                annualRainfall: '950 mm',
                monsoonRainfall: '700 mm',
                rainyDays: '60 days',
                waterWastage: '15,200 million liters',
                potentialSavings: '12,500 million liters'
            },
            'Vijayawada': {
                annualRainfall: '850 mm',
                monsoonRainfall: '650 mm',
                rainyDays: '55 days',
                waterWastage: '12,800 million liters',
                potentialSavings: '10,500 million liters'
            }
        }
    },
    'Karnataka': {
        districts: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
        data: {
            'Bangalore': {
                annualRainfall: '850 mm',
                monsoonRainfall: '600 mm',
                rainyDays: '50 days',
                waterWastage: '14,500 million liters',
                potentialSavings: '11,800 million liters'
            },
            'Mysore': {
                annualRainfall: '750 mm',
                monsoonRainfall: '550 mm',
                rainyDays: '45 days',
                waterWastage: '10,200 million liters',
                potentialSavings: '8,500 million liters'
            }
        }
    },
    'Maharashtra': {
        districts: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
        data: {
            'Mumbai': {
                annualRainfall: '2200 mm',
                monsoonRainfall: '2000 mm',
                rainyDays: '90 days',
                waterWastage: '25,000 million liters',
                potentialSavings: '20,000 million liters'
            },
            'Pune': {
                annualRainfall: '700 mm',
                monsoonRainfall: '600 mm',
                rainyDays: '50 days',
                waterWastage: '12,000 million liters',
                potentialSavings: '9,800 million liters'
            }
        }
    },
    'Tamil Nadu': {
        districts: ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem'],
        data: {
            'Chennai': {
                annualRainfall: '1400 mm',
                monsoonRainfall: '1000 mm',
                rainyDays: '70 days',
                waterWastage: '18,000 million liters',
                potentialSavings: '15,000 million liters'
            },
            'Coimbatore': {
                annualRainfall: '600 mm',
                monsoonRainfall: '450 mm',
                rainyDays: '40 days',
                waterWastage: '8,500 million liters',
                potentialSavings: '7,000 million liters'
            }
        }
    }
};

// Track currently selected state
let currentState = null;

stateAreas.forEach(area => {
    area.addEventListener('click', function() {
        const state = this.getAttribute('data-state');
        currentState = state;
        
        // Remove active class from all states
        stateAreas.forEach(a => a.classList.remove('active'));
        // Add active class to clicked state
        this.classList.add('active');
        
        // Populate district dropdown
        districtSelect.innerHTML = '<option value="">Select a district</option>';
        
        if (stateDistrictData[state]) {
            stateDistrictData[state].districts.forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district;
                districtSelect.appendChild(option);
            });
            
            districtSelector.style.display = 'block';
            rainfallDataDiv.style.display = 'none';
        } else {
            districtSelector.style.display = 'none';
            rainfallDataDiv.style.display = 'none';
            alert('Data not available for this state yet.');
        }
    });
});

districtSelect.addEventListener('change', function() {
    const district = this.value;
    
    if (currentState && district && stateDistrictData[currentState] && stateDistrictData[currentState].data[district]) {
        const data = stateDistrictData[currentState].data[district];
        
        document.getElementById('annual-rainfall').textContent = data.annualRainfall;
        document.getElementById('monsoon-rainfall').textContent = data.monsoonRainfall;
        document.getElementById('rainy-days').textContent = data.rainyDays;
        document.getElementById('water-wastage').textContent = data.waterWastage;
        document.getElementById('potential-savings').textContent = data.potentialSavings;
        
        rainfallDataDiv.style.display = 'block';
        
        // Scroll to data
        rainfallDataDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        rainfallDataDiv.style.display = 'none';
    }
});

// Initialize rain animation
createRain();

// Smooth scrolling for navigation
document.querySelectorAll('nav a, .cta-button').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const product = this.closest('.product-card').querySelector('h3').textContent;
        alert(`${product} added to cart!`);
    });
});