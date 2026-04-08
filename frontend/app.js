document.addEventListener('DOMContentLoaded', () => {
    // Determine the backend URL based on the environment (this will be handled via proxy in production usually, or configured here)
    // For local dev, you'd use http://localhost:5000. In K8s, it might be the service name, but since it's client-side, we need a public IP or an Ingress.
    // We will assume the backend is available at /api if using an Ingress, otherwise change this to the Backend LB IP.

    // For demo purposes on EC2, we're assuming the NodePort or LoadBalancer URL is provided here, 
    // or we can fallback to localhost for local testing.
    const backendUrl = "/api";

    const productList = document.getElementById('product-list');
    const errorMessage = document.getElementById('error-message');

    // Add To Cart Function
    window.addToCart = async (productId) => {
        try {
            const response = await fetch(`${backendUrl}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId })
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                updateCartCount(result.cartCount);
            } else {
                alert('Error: ' + result.message);
            }
        } catch (err) {
            console.error('Error adding to cart:', err);
            alert('Failed to add item to cart. Backend might be down.');
        }
    };

    function updateCartCount(count) {
        const cartLink = document.querySelector('a[href="#cart"]'); // Assuming we add this ID or just find the link
        const cartNavItem = document.querySelector('.nav-links li:last-child a');
        if (cartNavItem) {
            cartNavItem.innerHTML = `Cart 🛒 (${count})`;
        }
    }

    // Fetch products from Backend
    fetch(`${backendUrl}/products`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                productList.innerHTML = '<p>No products found.</p>';
                return;
            }

            data.forEach(product => {
                const productEl = document.createElement('div');
                productEl.className = 'product-card';
                productEl.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">₹${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productList.appendChild(productEl);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            errorMessage.textContent = 'Failed to load products. Check if the backend is running.';
        });

    // Initial Cart Fetch
    fetch(`${backendUrl}/cart`)
        .then(res => res.json())
        .then(cart => {
            updateCartCount(cart.length);
        })
        .catch(err => console.error('Error fetching initial cart:', err));
});
