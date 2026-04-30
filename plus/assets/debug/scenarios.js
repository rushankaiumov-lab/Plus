(function () {
  var scenarios = [
    {
      id: 'activation',
      flow: 'activation',
      title: 'Non-subscriber • Plus home page • Trial is available',
      description: 'Non-subscriber entry state with trial available.',
      descriptionEn: 'Non-subscriber entry state with trial available.',
      descriptionRu: 'Входное состояние для non-subscriber с доступным trial.',
      entry: { screen: 'landing' },
      state: { hasPaymentMethod: false, isTrial: true, showAddPaymentMethodSheet: true, trialTokenizeCard: true, animateSavingsCounter: true, animateSavingsStart: '1019.97', animateSavingsDelta: '', hasTabbyCash: false, hasCashbackActive: false },
      variants: {
        A: { id: 'A', title: 'Control copy' },
        B: { id: 'B', title: 'Alternative copy' },
        C: { id: 'C', title: 'Short copy' }
      }
    },
    {
      id: 'activation-cards-benefits',
      flow: 'activation-cards-benefits',
      title: 'Subscriber • Plus active page • Paid subscription active',
      description: 'Subscriber active page in paid subscription mode.',
      descriptionEn: 'Subscriber active page in paid subscription mode.',
      descriptionRu: 'Экран активной подписки в платном режиме.',
      entry: { screen: 'subscription' },
      state: { hasPaymentMethod: true, isTrial: false, trialTokenizeCard: true, animateSavingsCounter: true, animateSavingsStart: '1019.97', animateSavingsDelta: '', hasTabbyCash: false, hasCashbackActive: false },
      variants: {
        A: { id: 'A', title: 'Control structure' },
        B: { id: 'B', title: 'Alternative structure' },
        C: { id: 'C', title: 'Compressed structure' }
      }
    },
    {
      id: 'subscriber-active-trial',
      flow: 'activation-cards-benefits',
      title: 'Subscriber • Plus active page • Trial success',
      description: 'Subscriber active page in trial mode.',
      descriptionEn: 'Subscriber active page in trial mode.',
      descriptionRu: 'Экран активной подписки в режиме trial.',
      entry: { screen: 'subscription' },
      state: { hasPaymentMethod: true, isTrial: true, trialTokenizeCard: true, animateSavingsCounter: true, animateSavingsStart: '1019.97', animateSavingsDelta: '', hasTabbyCash: false, hasCashbackActive: false },
      variants: {
        A: { id: 'A', title: 'Control structure' },
        B: { id: 'B', title: 'Alternative structure' },
        C: { id: 'C', title: 'Compressed structure' }
      }
    },
    {
      id: 'cancellation',
      flow: 'cancellation',
      title: 'Subscriber • Cancel warning page • Baseline',
      description: 'Cancellation warning state before final cancellation.',
      descriptionEn: 'Cancellation warning state before final cancellation.',
      descriptionRu: 'Состояние предупреждения перед финальной отменой подписки.',
      entry: { screen: 'cancel-warning' },
      state: {
        hasPaymentMethod: true,
        isTrial: false,
        hasTabbyCard: true,
        hasTabbyCash: false,
        hasCashbackActive: false,
        hasOlPurchases: false,
        hasActiveSplit6: true,
        offerAvailable: true,
        buybackAed: 25,
        trialTokenizeCard: true,
        animateSavingsCounter: true,
        animateSavingsStart: '1019.97',
        animateSavingsDelta: ''
      },
      variants: {
        A: { id: 'A', title: 'Control framing' },
        B: { id: 'B', title: 'Soft framing' },
        C: { id: 'C', title: 'Hard framing' }
      }
    }
  ];

  function getScenarioById(id) {
    for (var i = 0; i < scenarios.length; i += 1) {
      if (scenarios[i].id === id) return scenarios[i];
    }
    return null;
  }

  function resolveVariant(scenario, variantId) {
    if (!scenario || !scenario.variants) return null;
    var key = String(variantId || 'A').toUpperCase();
    return scenario.variants[key] || scenario.variants.A || null;
  }

  window.PLUS_DEBUG_SCENARIOS = scenarios;
  window.PLUS_DEBUG_API = {
    getScenarioById: getScenarioById,
    resolveVariant: resolveVariant
  };
})();
