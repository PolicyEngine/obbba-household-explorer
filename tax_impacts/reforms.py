import numpy as np
from policyengine_core.reforms import Reform

def tcja_reform():
        
    return Reform.from_dict(
        {
            "gov.irs.income.bracket.rates.2": {"2026-01-01.2100-12-31": 0.12},
            "gov.irs.income.bracket.rates.3": {"2026-01-01.2100-12-31": 0.22},
            "gov.irs.income.bracket.rates.4": {"2026-01-01.2100-12-31": 0.24},
            "gov.irs.income.bracket.rates.5": {"2026-01-01.2100-12-31": 0.32},
            "gov.irs.income.bracket.rates.7": {"2026-01-01.2100-12-31": 0.37},
            "gov.irs.deductions.qbi.max.rate": {"2026-01-01.2100-12-31": 0.2},
            "gov.irs.income.exemption.amount": {"2026-01-01.2100-12-31": 0},
            "gov.irs.deductions.qbi.max.w2_wages.rate": {"2026-01-01.2100-12-31": 0.5},
            "gov.irs.deductions.standard.amount.JOINT": {
                "2026-01-01.2026-12-31": 30300,
            },
            "gov.irs.credits.ctc.amount.base[0].amount": {"2026-01-01.2100-12-31": 2000},
            "gov.irs.deductions.standard.amount.SINGLE": {
                "2026-01-01.2026-12-31": 15150,
            },
            "gov.irs.income.amt.exemption.amount.JOINT": {
                "2026-01-01.2026-12-31": 139100,
            },
            "gov.irs.income.bracket.thresholds.3.JOINT": {
                "2026-01-01.2026-12-31": 208300,
            },
            "gov.irs.income.bracket.thresholds.4.JOINT": {
                "2026-01-01.2026-12-31": 397650,
            },
            "gov.irs.income.bracket.thresholds.5.JOINT": {
                "2026-01-01.2026-12-31": 512950,
            },
            "gov.irs.income.bracket.thresholds.6.JOINT": {
                "2026-01-01.2026-12-31": 769450,
            },
            "gov.irs.credits.ctc.amount.adult_dependent": {"2026-01-01.2100-12-31": 500},
            "gov.irs.income.amt.exemption.amount.SINGLE": {
                "2026-01-01.2026-12-31": 89400,
            },
            "gov.irs.income.bracket.thresholds.3.SINGLE": {
                "2026-01-01.2026-12-31": 104900,
            },
            "gov.irs.income.bracket.thresholds.4.SINGLE": {
                "2026-01-01.2026-12-31": 198800,
            },
            "gov.irs.income.bracket.thresholds.5.SINGLE": {
                "2026-01-01.2026-12-31": 256450,
            },
            "gov.irs.income.bracket.thresholds.6.SINGLE": {
                "2026-01-01.2026-12-31": 641200,
            },
            "gov.irs.deductions.itemized.casualty.active": {"2026-01-01.2100-12-31": False},
            "gov.irs.deductions.standard.amount.SEPARATE": {
                "2026-01-01.2026-12-31": 15150,
            },
            "gov.irs.deductions.qbi.max.w2_wages.alt_rate": {"2026-01-01.2100-12-31": 0.25},
            "gov.irs.deductions.qbi.phase_out.start.JOINT": {
                "2026-01-01.2026-12-31": 409800,
            },
            "gov.irs.income.amt.exemption.amount.SEPARATE": {
                "2026-01-01.2026-12-31": 69500,
            },
            "gov.irs.income.bracket.thresholds.3.SEPARATE": {
                "2026-01-01.2026-12-31": 104900,
            },
            "gov.irs.income.bracket.thresholds.4.SEPARATE": {
                "2026-01-01.2026-12-31": 198800,
            },
            "gov.irs.income.bracket.thresholds.5.SEPARATE": {
                "2026-01-01.2026-12-31": 256450,
            },
            "gov.irs.income.bracket.thresholds.6.SEPARATE": {
                "2026-01-01.2026-12-31": 384700,
            },
            "gov.irs.credits.ctc.phase_out.threshold.JOINT": {
                "2026-01-01.2100-12-31": 400000
            },
            "gov.irs.credits.ctc.refundable.individual_max": {
                "2026-01-01.2026-12-31": 1800,
            },
            "gov.irs.deductions.qbi.phase_out.length.JOINT": {
                "2026-01-01.2100-12-31": 100000
            },
            "gov.irs.deductions.qbi.phase_out.start.SINGLE": {
                "2026-01-01.2026-12-31": 204900,
            },
            "gov.irs.credits.ctc.phase_out.threshold.SINGLE": {
                "2026-01-01.2100-12-31": 200000
            },
            "gov.irs.deductions.qbi.phase_out.length.SINGLE": {
                "2026-01-01.2100-12-31": 50000
            },
            "gov.irs.deductions.itemized.charity.ceiling.all": {
                "2026-01-01.2100-12-31": 0.6
            },
            "gov.irs.deductions.itemized.limitation.agi_rate": {
                "2026-01-01.2100-12-31": np.inf
            },
            "gov.irs.deductions.qbi.phase_out.start.SEPARATE": {
                "2026-01-01.2026-12-31": 204900,
            },
            "gov.irs.credits.ctc.phase_out.threshold.SEPARATE": {
                "2026-01-01.2100-12-31": 200000
            },
            "gov.irs.deductions.qbi.phase_out.length.SEPARATE": {
                "2026-01-01.2100-12-31": 50000
            },
            "gov.irs.credits.ctc.refundable.phase_in.threshold": {
                "2026-01-01.2100-12-31": 2500
            },
            "gov.irs.deductions.qbi.max.business_property.rate": {
                "2026-01-01.2100-12-31": 0.025
            },
            "gov.irs.income.amt.exemption.phase_out.start.JOINT": {
                "2026-01-01.2026-12-31": 1271900,
            },
            "gov.irs.deductions.standard.amount.SURVIVING_SPOUSE": {
                "2026-01-01.2026-12-31": 30300,
            },
            "gov.irs.income.amt.exemption.phase_out.start.SINGLE": {
                "2026-01-01.2026-12-31": 635900,
            },
            "gov.irs.deductions.standard.amount.HEAD_OF_HOUSEHOLD": {
                "2026-01-01.2026-12-31": 22700,
            },
            "gov.irs.income.amt.exemption.amount.SURVIVING_SPOUSE": {
                "2026-01-01.2026-12-31": 139100,
            },
            "gov.irs.income.bracket.thresholds.3.SURVIVING_SPOUSE": {
                "2026-01-01.2026-12-31": 208300,
            },
            "gov.irs.income.bracket.thresholds.4.SURVIVING_SPOUSE": {
                "2026-01-01.2026-12-31": 397650,
            },
            "gov.irs.income.bracket.thresholds.5.SURVIVING_SPOUSE": {
                "2026-01-01.2026-12-31": 512950,
            },
            "gov.irs.income.bracket.thresholds.6.SURVIVING_SPOUSE": {
                "2026-01-01.2026-12-31": 769450,
            },
            "gov.irs.income.amt.exemption.amount.HEAD_OF_HOUSEHOLD": {
                "2026-01-01.2026-12-31": 89400,
            },
            "gov.irs.income.amt.exemption.phase_out.start.SEPARATE": {
                "2026-01-01.2026-12-31": 635900,
            },
            "gov.irs.income.bracket.thresholds.3.HEAD_OF_HOUSEHOLD": {
                "2026-01-01.2026-12-31": 104900,
            },
            "gov.irs.income.bracket.thresholds.4.HEAD_OF_HOUSEHOLD": {
                "2026-01-01.2026-12-31": 198800,
            },
            "gov.irs.income.bracket.thresholds.5.HEAD_OF_HOUSEHOLD": {
                "2026-01-01.2026-12-31": 256486,
            },
            "gov.irs.income.bracket.thresholds.6.HEAD_OF_HOUSEHOLD": {
                "2026-01-01.2026-12-31": 641200,
            },
            "gov.irs.deductions.qbi.phase_out.start.SURVIVING_SPOUSE": {
                "2026-01-01.2026-12-31": 409800,
            },
            "gov.irs.credits.ctc.phase_out.threshold.SURVIVING_SPOUSE": {
                "2026-01-01.2100-12-31": 400000
            },
            "gov.irs.deductions.qbi.phase_out.length.SURVIVING_SPOUSE": {
                "2026-01-01.2100-12-31": 100000
            },
            "gov.irs.deductions.qbi.phase_out.start.HEAD_OF_HOUSEHOLD": {
                "2026-01-01.2026-12-31": 204900,
            },
            "gov.irs.credits.ctc.phase_out.threshold.HEAD_OF_HOUSEHOLD": {
                "2026-01-01.2100-12-31": 200000
            },
            "gov.irs.deductions.qbi.phase_out.length.HEAD_OF_HOUSEHOLD": {
                "2026-01-01.2100-12-31": 50000
            },
            "gov.irs.deductions.itemized.salt_and_real_estate.cap.JOINT": {
                "2026-01-01.2100-12-31": 10000
            },
            "gov.irs.deductions.itemized.salt_and_real_estate.cap.SINGLE": {
                "2026-01-01.2100-12-31": 10000
            },
            "gov.irs.deductions.itemized.salt_and_real_estate.cap.SEPARATE": {
                "2026-01-01.2100-12-31": 5000
            },
            "gov.irs.income.amt.exemption.phase_out.start.SURVIVING_SPOUSE": {
                "2026-01-01.2026-12-31": 1271900,
            },
            "gov.irs.deductions.itemized.limitation.applicable_amount.JOINT": {
                "2026-01-01.2100-12-31": np.inf
            },
            "gov.irs.deductions.itemized.limitation.itemized_deduction_rate": {
                "2026-01-01.2100-12-31": np.inf
            },
            "gov.irs.income.amt.exemption.phase_out.start.HEAD_OF_HOUSEHOLD": {
                "2026-01-01.2026-12-31": 635900,
            },
            "gov.irs.deductions.itemized.limitation.applicable_amount.SINGLE": {
                "2026-01-01.2100-12-31": np.inf
            },
            "gov.irs.deductions.itemized.limitation.applicable_amount.SEPARATE": {
                "2026-01-01.2100-12-31": np.inf
            },
            "gov.irs.deductions.itemized.salt_and_real_estate.cap.SURVIVING_SPOUSE": {
                "2026-01-01.2100-12-31": 10_000
            },
            "gov.irs.deductions.itemized.salt_and_real_estate.cap.HEAD_OF_HOUSEHOLD": {
                "2026-01-01.2100-12-31": 10_000
            },
            "gov.irs.deductions.itemized.limitation.applicable_amount.SURVIVING_SPOUSE": {
                "2026-01-01.2100-12-31": np.inf
            },
            "gov.irs.deductions.itemized.limitation.applicable_amount.HEAD_OF_HOUSEHOLD": {
                "2026-01-01.2100-12-31": np.inf
            },
            "gov.irs.credits.estate.base": {
                "2026-01-01.2026-12-31": 14200000,
            },
            "gov.irs.income.amt.exemption.separate_limit": {
                "2026-01-01.2026-12-31": 913900,
            },
            "gov.irs.deductions.itemized.misc.applies": {
                "2026-01-01.2100-12-31": False
            },
            "gov.irs.deductions.itemized.interest.mortgage.cap.JOINT": {
                "2026-01-01.2100-12-31": 750000
            },
            "gov.irs.deductions.itemized.interest.mortgage.cap.SINGLE": {
                "2026-01-01.2100-12-31": 750000
            },
            "gov.irs.deductions.itemized.interest.mortgage.cap.SEPARATE": {
                "2026-01-01.2100-12-31": 375000
            },
            "gov.irs.deductions.itemized.interest.mortgage.cap.SURVIVING_SPOUSE": {
                "2026-01-01.2100-12-31": 750000
            },
            "gov.irs.deductions.itemized.interest.mortgage.cap.HEAD_OF_HOUSEHOLD": {
                "2026-01-01.2100-12-31": 750000
            },
        },
        country_id="us",
    )


def hr1_tax_rate_reform():
    return Reform.from_dict({
    "gov.irs.income.bracket.rates.2": {
        "2026-01-01.2100-12-31": 0.12
    },
    "gov.irs.income.bracket.rates.3": {
        "2026-01-01.2100-12-31": 0.22
    },
    "gov.irs.income.bracket.rates.4": {
        "2026-01-01.2100-12-31": 0.24
    },
    "gov.irs.income.bracket.rates.5": {
        "2026-01-01.2100-12-31": 0.32
    },
    "gov.irs.income.bracket.rates.7": {
        "2026-01-01.2100-12-31": 0.37
    },
    "gov.irs.income.bracket.thresholds.3.HEAD_OF_HOUSEHOLD": {
        "2026-01-01.2026-12-31": 104900,
    },
    "gov.irs.income.bracket.thresholds.4.HEAD_OF_HOUSEHOLD": {
        "2026-01-01.2026-12-31": 198800,
    },
    "gov.irs.income.bracket.thresholds.5.HEAD_OF_HOUSEHOLD": {
        "2026-01-01.2026-12-31": 256486,
    },
    "gov.irs.income.bracket.thresholds.6.HEAD_OF_HOUSEHOLD": {
        "2026-01-01.2026-12-31": 643950,
    },
    "gov.irs.income.bracket.thresholds.3.JOINT": {
        "2026-01-01.2026-12-31": 208300,
    },
    "gov.irs.income.bracket.thresholds.4.JOINT": {
        "2026-01-01.2026-12-31": 397650,
    },
    "gov.irs.income.bracket.thresholds.5.JOINT": {
        "2026-01-01.2026-12-31": 512950,
    },
    "gov.irs.income.bracket.thresholds.6.JOINT": {
        "2026-01-01.2026-12-31": 772750,
    },
    "gov.irs.income.bracket.thresholds.3.SEPARATE": {
        "2026-01-01.2026-12-31": 104900,
    },
    "gov.irs.income.bracket.thresholds.4.SEPARATE": {
        "2026-01-01.2026-12-31": 198800,
    },
    "gov.irs.income.bracket.thresholds.5.SEPARATE": {
        "2026-01-01.2026-12-31": 256450,
    },
    "gov.irs.income.bracket.thresholds.6.SEPARATE": {
        "2026-01-01.2026-12-31": 386350,
    },
    "gov.irs.income.bracket.thresholds.3.SINGLE": {
        "2026-01-01.2026-12-31": 105475,
    },
    "gov.irs.income.bracket.thresholds.4.SINGLE": {
        "2026-01-01.2026-12-31": 198800,
    },
    "gov.irs.income.bracket.thresholds.5.SINGLE": {
        "2026-01-01.2026-12-31": 256450,
    },
    "gov.irs.income.bracket.thresholds.6.SINGLE": {
        "2026-01-01.2026-12-31": 643950,
    },
    "gov.irs.income.bracket.thresholds.3.SURVIVING_SPOUSE": {
        "2026-01-01.2026-12-31": 208300,
    },
    "gov.irs.income.bracket.thresholds.4.SURVIVING_SPOUSE": {
        "2026-01-01.2026-12-31": 397650,
    },
    "gov.irs.income.bracket.thresholds.5.SURVIVING_SPOUSE": {
        "2026-01-01.2026-12-31": 512950,
    },
    "gov.irs.income.bracket.thresholds.6.SURVIVING_SPOUSE": {
        "2026-01-01.2026-12-31": 772750,
    },
    }, country_id="us")

def hr1_sd_reform():
    return Reform.from_dict({
        "gov.irs.deductions.standard.amount.JOINT": {
            "2026-01-01.2026-12-31": 32300,
        },
        "gov.irs.deductions.standard.amount.SINGLE": {
            "2026-01-01.2026-12-31": 16150,
        },
        "gov.irs.deductions.standard.amount.SEPARATE": {
            "2026-01-01.2026-12-31": 16150,
        },
        "gov.irs.deductions.standard.amount.SURVIVING_SPOUSE": {
            "2026-01-01.2026-12-31": 32300,
        },
        "gov.irs.deductions.standard.amount.HEAD_OF_HOUSEHOLD": {
            "2026-01-01.2026-12-31": 24400,
        },
    }, country_id="us")

def hr1_exemption_reform():
    return Reform.from_dict({
        "gov.irs.income.exemption.amount": {
            "2026-01-01.2100-12-31": 0
        }
    }, country_id="us")

def hr1_ctc_reform():
    return Reform.from_dict({
        "gov.contrib.reconciliation.ctc.in_effect": {
            "2025-01-01.2100-12-31": True
        },
        "gov.irs.credits.ctc.amount.base[0].amount": {
            "2025-01-01.2028-12-31": 2500
        },
        "gov.irs.credits.ctc.amount.adult_dependent": {
            "2026-01-01.2100-12-31": 500
        },
        "gov.irs.credits.ctc.phase_out.threshold.JOINT": {
            "2026-01-01.2100-12-31": 400000
        },
        "gov.irs.credits.ctc.refundable.individual_max": {
            "2026-01-01.2026-12-31": 1700
        },
        "gov.irs.credits.ctc.phase_out.threshold.SINGLE": {
            "2026-01-01.2100-12-31": 200000
        },
        "gov.irs.credits.ctc.phase_out.threshold.SEPARATE": {
            "2026-01-01.2100-12-31": 200000
        },
        "gov.irs.credits.ctc.refundable.phase_in.threshold": {
            "2026-01-01.2100-12-31": 2500
        },
        "gov.irs.credits.ctc.phase_out.threshold.SURVIVING_SPOUSE": {
            "2026-01-01.2100-12-31": 400000
        },
        "gov.irs.credits.ctc.phase_out.threshold.HEAD_OF_HOUSEHOLD": {
            "2026-01-01.2100-12-31": 200000
        }
    }, country_id="us")

def hr1_qbi_reform():
    return Reform.from_dict({
        "gov.irs.deductions.qbi.max.rate": {
            "2026-01-01.2100-12-31": 0.23
        },
        "gov.irs.deductions.qbi.max.w2_wages.rate": {
            "2026-01-01.2100-12-31": 0.5
        },
        "gov.contrib.reconciliation.qbid.in_effect": {
            "2026-01-01.2100-12-31": True
        },
        "gov.irs.deductions.qbi.max.w2_wages.alt_rate": {
            "2026-01-01.2035-12-31": 0.25
        },
        "gov.irs.deductions.qbi.phase_out.start.JOINT": {
            "2026-01-01.2026-12-31": 400600,
        },
        "gov.irs.deductions.qbi.phase_out.start.SINGLE": {
            "2026-01-01.2026-12-31": 200300,
        },
        "gov.irs.deductions.qbi.phase_out.start.SEPARATE": {
            "2026-01-01.2026-12-31": 200300,
        },
        "gov.irs.deductions.qbi.max.business_property.rate": {
            "2026-01-01.2100-12-31": 0.025
        },
        "gov.irs.deductions.qbi.phase_out.start.SURVIVING_SPOUSE": {
            "2026-01-01.2026-12-31": 400600,
        },
        "gov.irs.deductions.qbi.phase_out.start.HEAD_OF_HOUSEHOLD": {
            "2026-01-01.2026-12-31": 200300,
        }
    }, country_id="us")

def hr1_estate_tax_reform():
    return Reform.from_dict({
        "gov.irs.credits.estate.base": {
            "2026-01-01.2026-12-31": 15000000,
        }
    }, country_id="us")

def hr1_amt_reform():
    return Reform.from_dict({
        "gov.irs.income.amt.exemption.amount.JOINT": {
            "2026-01-01.2026-12-31": 109400,
        },
        "gov.irs.income.amt.exemption.amount.SINGLE": {
            "2026-01-01.2026-12-31": 70300,
        },
        "gov.irs.income.amt.exemption.separate_limit": {
            "2026-01-01.2026-12-31": 718800,
        },
        "gov.irs.income.amt.exemption.amount.SEPARATE": {
            "2026-01-01.2026-12-31": 54700,
        },
        "gov.irs.income.amt.exemption.phase_out.start.JOINT": {
            "2026-01-01.2026-12-31": 1000000,
        },
        "gov.irs.income.amt.exemption.phase_out.start.SINGLE": {
            "2026-01-01.2026-12-31": 500000,
        },
        "gov.irs.income.amt.exemption.amount.SURVIVING_SPOUSE": {
            "2026-01-01.2026-12-31": 109400,
        },
        "gov.irs.income.amt.exemption.amount.HEAD_OF_HOUSEHOLD": {
            "2026-01-01.2026-12-31": 70300,
        },
        "gov.irs.income.amt.exemption.phase_out.start.SEPARATE": {
            "2026-01-01.2026-12-31": 500000,
        },
        "gov.irs.income.amt.exemption.phase_out.start.SURVIVING_SPOUSE": {
            "2026-01-01.2026-12-31": 1000000,
        }
    }, country_id="us")

def hr1_misc_reform():
    return Reform.from_dict({
        "gov.irs.deductions.itemized.misc.applies": {
            "2026-01-01.2100-12-31": False
        }
    }, country_id="us")

def hr1_other_item_reform():
    return Reform.from_dict({
        "gov.irs.deductions.itemized.interest.mortgage.cap.JOINT": {
            "2026-01-01.2100-12-31": 750000
        },
        "gov.irs.deductions.itemized.interest.mortgage.cap.SINGLE": {
            "2026-01-01.2100-12-31": 750000
        },
        "gov.irs.deductions.itemized.interest.mortgage.cap.SEPARATE": {
            "2026-01-01.2100-12-31": 375000
        },
        "gov.irs.deductions.itemized.charity.non_itemizers_amount.JOINT": {
            "2025-01-01.2028-12-31": 300
        },
        "gov.irs.deductions.itemized.charity.non_itemizers_amount.SINGLE": {
            "2025-01-01.2028-12-31": 150
        },
        "gov.irs.deductions.itemized.charity.non_itemizers_amount.SEPARATE": {
            "2025-01-01.2028-12-31": 150
        },
        "gov.irs.deductions.itemized.interest.mortgage.cap.SURVIVING_SPOUSE": {
            "2026-01-01.2100-12-31": 750000
        },
        "gov.irs.deductions.itemized.interest.mortgage.cap.HEAD_OF_HOUSEHOLD": {
            "2026-01-01.2100-12-31": 750000
        },
        "gov.irs.deductions.itemized.charity.non_itemizers_amount.SURVIVING_SPOUSE": {
            "2025-01-01.2028-12-31": 150
        },
        "gov.irs.deductions.itemized.charity.non_itemizers_amount.HEAD_OF_HOUSEHOLD": {
            "2025-01-01.2028-12-31": 150
        }
    }, country_id="us")

def hr1_pease_reform():
    return Reform.from_dict({
        "gov.contrib.reconciliation.pease.in_effect": {
            "2026-01-01.2100-12-31": True
        },
        "gov.contrib.reconciliation.pease.amended_structure.in_effect": {
            "2026-01-01.2100-12-31": True
        }
    }, country_id="us")

def hr1_tip_reform():
    return Reform.from_dict({
        "gov.contrib.reconciliation.tip_income_exempt.in_effect": {
            "2025-01-01.2028-12-31": True
        }
    }, country_id="us")

def hr1_overtime_reform():
    return Reform.from_dict({
        "gov.contrib.reconciliation.overtime_income_exempt.in_effect": {
            "2025-01-01.2028-12-31": True
        }
    }, country_id="us")

def hr1_senior_deduction_reform():
    return Reform.from_dict({
        "gov.contrib.reconciliation.additional_senior_standard_deduction.in_effect": {
            "2025-01-01.2028-12-31": True
        },
    }, country_id="us")

def hr1_auto_loan_reform():
    return Reform.from_dict({
        "gov.contrib.reconciliation.auto_loan_interest_ald.in_effect": {
            "2025-01-01.2028-12-31": True
        }
    }, country_id="us")

def hr1_salt_reform():
    return Reform.from_dict({
        "gov.contrib.salt_phase_out.rate": {
            "2025-01-01.2100-12-31": 0.3
        },
        "gov.contrib.salt_phase_out.in_effect": {
            "2025-01-01.2100-12-31": True
        },
        "gov.contrib.salt_phase_out.floor.applies": {
            "2025-01-01.2100-12-31": True
        },
        "gov.contrib.salt_phase_out.threshold.JOINT": {
            "2026-01-01.2026-12-31": 505000,
        },
        "gov.contrib.salt_phase_out.threshold.SINGLE": {
            "2026-01-01.2026-12-31": 505000,
        },
        "gov.contrib.salt_phase_out.threshold.SEPARATE": {
            "2026-01-01.2026-12-31": 252500,
        },
        "gov.contrib.salt_phase_out.threshold.SURVIVING_SPOUSE": {
            "2026-01-01.2026-12-31": 505000,
        },
        "gov.contrib.salt_phase_out.threshold.HEAD_OF_HOUSEHOLD": {
            "2026-01-01.2026-12-31": 505000,
        },
        "gov.irs.deductions.itemized.salt_and_real_estate.cap.JOINT": {
            "2026-01-01.2026-12-31": 40400,
        },
        "gov.irs.deductions.itemized.salt_and_real_estate.cap.SINGLE": {
            "2026-01-01.2026-12-31": 40400,
        },
        "gov.irs.deductions.itemized.salt_and_real_estate.cap.SEPARATE": {
            "2026-01-01.2026-12-31": 20200,
        },
        "gov.irs.deductions.itemized.salt_and_real_estate.cap.SURVIVING_SPOUSE": {
            "2026-01-01.2026-12-31": 40400,
        },
        "gov.irs.deductions.itemized.salt_and_real_estate.cap.HEAD_OF_HOUSEHOLD": {
            "2026-01-01.2026-12-31": 40400,
        }
    }, country_id="us")

def get_all_reforms():
    """Get dictionary of all reform components."""
    return {
        "Tax Rate Reform": hr1_tax_rate_reform(),
        "Standard Deduction Reform": hr1_sd_reform(),
        "Exemption Reform": hr1_exemption_reform(),
        "CTC Reform": hr1_ctc_reform(),
        "QBID Reform": hr1_qbi_reform(),
        "Estate Tax Reform": hr1_estate_tax_reform(),
        "AMT Reform": hr1_amt_reform(),
        "Miscellaneous Reform": hr1_misc_reform(),
        "Other Itemized Deductions Reform": hr1_other_item_reform(),
        "Pease Reform": hr1_pease_reform(),
        "Tip Income Exempt": hr1_tip_reform(),
        "Overtime Income Exempt": hr1_overtime_reform(),
        "Senior Deduction Reform": hr1_senior_deduction_reform(),
        "Auto Loan Interest ALD": hr1_auto_loan_reform(),
        "SALT Reform": hr1_salt_reform(),
    }