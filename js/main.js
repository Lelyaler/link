document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('header--scrolled');
    } else {
      header?.classList.remove('header--scrolled');
    }
  });

  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.mobile-drawer__link');

  function openDrawer() {
    hamburgerBtn?.classList.add('header__hamburger--open');
    mobileDrawer?.classList.add('mobile-drawer--active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    hamburgerBtn?.classList.remove('header__hamburger--open');
    mobileDrawer?.classList.remove('mobile-drawer--active');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', () => {
    const isOpen = mobileDrawer?.classList.contains('mobile-drawer--active');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawerBackdrop?.addEventListener('click', closeDrawer);
  drawerLinks.forEach((link) => link.addEventListener('click', closeDrawer));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq__trigger');
    const content = item.querySelector('.faq__content');

    trigger?.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq__item--open');

      faqItems.forEach((other) => {
        if (other !== item && other.classList.contains('faq__item--open')) {
          other.classList.remove('faq__item--open');
          const otherContent = other.querySelector('.faq__content');
          if (otherContent) otherContent.style.maxHeight = '0';
        }
      });

      if (isOpen) {
        item.classList.remove('faq__item--open');
        if (content) content.style.maxHeight = '0';
      } else {
        item.classList.add('faq__item--open');
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    firstItem.classList.add('faq__item--open');
    const firstContent = firstItem.querySelector('.faq__content');
    if (firstContent) firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
  }

  const billingSwitch = document.getElementById('billingSwitch');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const annualLabel = document.getElementById('annualLabel');
  const starterPrice = document.getElementById('priceStarter');
  const growthPrice = document.getElementById('priceGrowth');

  let isAnnual = false;

  function updatePricing() {
    if (isAnnual) {
      billingSwitch?.classList.add('pricing__switch--annual');
      monthlyLabel?.classList.remove('pricing__toggle-label--active');
      annualLabel?.classList.add('pricing__toggle-label--active');
      if (starterPrice) starterPrice.textContent = '$39';
      if (growthPrice) growthPrice.textContent = '$149';
    } else {
      billingSwitch?.classList.remove('pricing__switch--annual');
      monthlyLabel?.classList.add('pricing__toggle-label--active');
      annualLabel?.classList.remove('pricing__toggle-label--active');
      if (starterPrice) starterPrice.textContent = '$49';
      if (growthPrice) growthPrice.textContent = '$189';
    }
  }

  billingSwitch?.addEventListener('click', () => {
    isAnnual = !isAnnual;
    updatePricing();
  });

  monthlyLabel?.addEventListener('click', () => {
    isAnnual = false;
    updatePricing();
  });

  annualLabel?.addEventListener('click', () => {
    isAnnual = true;
    updatePricing();
  });

  const terminalBox = document.querySelector('.cta__terminal');
  terminalBox?.addEventListener('click', () => {
    const code = terminalBox.querySelector('code')?.textContent || '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        const originalText = terminalBox.innerHTML;
        terminalBox.innerHTML = '<span style="color:#4ade80">✓ Copied</span>';
        setTimeout(() => {
          terminalBox.innerHTML = originalText;
        }, 2200);
      });
    }
  });

  const volumeSlider = document.getElementById('volumeSlider');
  const calcSignals = document.getElementById('calcSignals');
  const calcPrice = document.getElementById('calcPrice');
  const calcHoursSaved = document.getElementById('calcHoursSaved');

  if (volumeSlider) {
    const updateCalculator = () => {
      const val = parseInt(volumeSlider.value, 10);
      let signalsStr = '';
      let costStr = '';
      let hoursStr = '';

      if (val < 1000000) {
        signalsStr = (val / 1000).toFixed(0) + 'K';
        costStr = '$49';
        hoursStr = '35 hrs';
      } else if (val < 10000000) {
        signalsStr = (val / 1000000).toFixed(1) + 'M';
        costStr = '$' + (189 + Math.floor((val - 1000000) / 1000000) * 45);
        hoursStr = Math.floor(val / 75000) + ' hrs';
      } else {
        signalsStr = (val / 1000000).toFixed(0) + 'M+';
        costStr = 'Custom SLA';
        hoursStr = '320+ hrs';
      }

      if (calcSignals) calcSignals.textContent = signalsStr;
      if (calcPrice) calcPrice.textContent = costStr;
      if (calcHoursSaved) calcHoursSaved.textContent = hoursStr;
    };

    volumeSlider.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  const demoForm = document.getElementById('demoForm');
  demoForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = demoForm.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = '✓ Request Received';
      btn.style.backgroundColor = '#336443';
      setTimeout(() => {
        demoForm.reset();
        btn.textContent = 'Book VIP Technical Session';
        btn.style.backgroundColor = '';
      }, 3500);
    }
  });

  const simBtns = document.querySelectorAll('.process__sim-btn');
  const simSource = document.getElementById('simSource');
  const simReasoning = document.getElementById('simReasoning');
  const simDispatch = document.getElementById('simDispatch');

  const simPresets = {
    stripe: {
      source: 'Stripe: payment_intent.succeeded ($840.00)',
      reasoning: 'Calibrated Agent: Verified VIP (Conf: 99.8%)',
      dispatch: 'Dispatched -> Postgres, Slack #sales, QuickBooks'
    },
    kafka: {
      source: 'Kafka: clickstream_surge (14.2K events/s)',
      reasoning: 'Spike Shaper: Rate-limited within burst SLA',
      dispatch: 'Dispatched -> Snowflake Data Lake (Zero-Loss)'
    },
    auth: {
      source: 'Okta SSO: anomalous_login (Geo drift: +4,200km)',
      reasoning: 'Security Guard: Risk score 0.94 > threshold',
      dispatch: 'Dispatched -> Session Terminated, PagerDuty Alert'
    }
  };

  simBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      simBtns.forEach((b) => b.classList.remove('process__sim-btn--active'));
      btn.classList.add('process__sim-btn--active');
      const preset = btn.getAttribute('data-sim');
      const data = simPresets[preset];
      if (data) {
        if (simSource) {
          simSource.textContent = data.source;
          simSource.parentElement.classList.add('process__sim-node--active');
          setTimeout(() => simSource.parentElement.classList.remove('process__sim-node--active'), 600);
        }
        if (simReasoning) {
          simReasoning.textContent = data.reasoning;
          simReasoning.parentElement.classList.add('process__sim-node--active');
          setTimeout(() => simReasoning.parentElement.classList.remove('process__sim-node--active'), 600);
        }
        if (simDispatch) {
          simDispatch.textContent = data.dispatch;
          simDispatch.parentElement.classList.add('process__sim-node--active');
          setTimeout(() => simDispatch.parentElement.classList.remove('process__sim-node--active'), 600);
        }
      }
    });
  });
});
