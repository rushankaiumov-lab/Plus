(function () {
  var scenarios = [
    {
      id: 'activation',
      flow: 'activation',
      title: 'Activation baseline',
      description: 'User starts Plus activation and adds a payment card.',
      descriptionEn: 'User starts Plus activation and adds a payment card.',
      descriptionRu: 'Пользователь начинает активацию Plus и добавляет карту для оплаты.',
      entry: { screen: 'landing' },
      state: { hasPaymentMethod: false },
      variants: {
        A: { id: 'A', title: 'Control copy' },
        B: { id: 'B', title: 'Alternative copy' },
        C: { id: 'C', title: 'Short copy' }
      }
    },
    {
      id: 'activation-cards-benefits',
      flow: 'activation-cards-benefits',
      title: 'Cards and benefits',
      description: 'Active subscription flow with card and benefits states.',
      descriptionEn: 'Active subscription flow with card and benefits states.',
      descriptionRu: 'Активная подписка с переходом к состояниям карт и бенефитов.',
      entry: { screen: 'subscription' },
      state: { hasPaymentMethod: true },
      variants: {
        A: { id: 'A', title: 'Control structure' },
        B: { id: 'B', title: 'Alternative structure' },
        C: { id: 'C', title: 'Compressed structure' }
      }
    },
    {
      id: 'cancellation',
      flow: 'cancellation',
      title: 'Cancellation baseline',
      description: 'User goes through warning and subscription cancellation completion.',
      descriptionEn: 'User goes through warning and subscription cancellation completion.',
      descriptionRu: 'Пользователь проходит предупреждение и завершение отмены подписки.',
      entry: { screen: 'cancel-warning' },
      state: {
        hasPaymentMethod: true,
        hasTabbyCard: true,
        hasOlPurchases: false,
        hasActiveSplit6: true
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
