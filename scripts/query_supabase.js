fetch("https://rfvmnmsmefyewqzwwduv.supabase.co/rest/v1/products?select=id,name,brand,price&limit=5", {
    headers: {
        "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmdm1ubXNtZWZ5ZXdxend3ZHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzODU1MDgsImV4cCI6MjA4Nzk2MTUwOH0.Hf3kLb0LCe8gi9dDRHsiGPbOJgfkebeX2yWhjmd8o0k",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmdm1ubXNtZWZ5ZXdxend3ZHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzODU1MDgsImV4cCI6MjA4Nzk2MTUwOH0.Hf3kLb0LCe8gi9dDRHsiGPbOJgfkebeX2yWhjmd8o0k"
    }
})
    .then(res => res.json())
    .then(data => {
        console.log("=== First 5 Products in live database ===");
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(err => console.error(err));
