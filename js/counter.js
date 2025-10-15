document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number');
    const statsContainer = document.querySelector('.stats-container');

    // ฟังก์ชันสำหรับเริ่มนับตัวเลข
    const runCounter = (counter) => {
        const target = +counter.dataset.target;
        let current = 0;
        
        // คำนวณความเร็วในการนับเพื่อให้ทุกตัวจบพร้อมๆ กัน (ประมาณ 2 วินาที)
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 10);

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                setTimeout(updateCounter, 10); // อัปเดตทุกๆ 10ms
            } else {
                counter.innerText = target; // ตั้งค่าสุดท้ายให้ตรงเป๊ะ
            }
        };

        updateCounter();
    };

    // ตั้งค่า Intersection Observer
    const observerOptions = {
        root: null, // สังเกตการณ์เทียบกับ viewport
        threshold: 0.5 // เริ่มทำงานเมื่อเห็น element 50%
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // ถ้า element เข้ามาในหน้าจอ
            if (entry.isIntersecting) {
                counters.forEach(counter => runCounter(counter));
                // หยุดการสังเกตการณ์หลังจากทำงานไปแล้ว 1 ครั้ง
                observer.unobserve(statsContainer); 
            }
        });
    }, observerOptions);

    // เริ่มสังเกตการณ์ statsContainer
    if (statsContainer) {
        observer.observe(statsContainer);
    }
});