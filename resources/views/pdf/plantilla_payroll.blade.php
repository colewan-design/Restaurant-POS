<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>General Plantilla Payroll</title>

    <style type="text/css">

body {
  font-size: small;
  line-height: 1.4;
}
p {
  margin: 0;
}
td, table, th {
    border: 1px solid black;
    border-collapse: collapse;
}
.new-page {
        page-break-before: always;
    }
@page {
        size: A3 landscape;
    }
    </style>
</head>
<body>
<section>
    <table style="width: 100%; border: none;">
        <tr>
            <td colspan="4" style="text-align: center; vertical-align: middle; border: none;">
                PAYROLL<br>
                For the period: December 1-31, 2023
            </td>
        </tr>
        <tr>
            <td style="border: none;">
                Fund Cluster: General Fund
            </td>
        </tr>
        <tr>
            <td style="border: none;">
                WE HEREBY ACKNOWLEDGE to have received from LandBank of the Philippines thru our LBP Payroll Account the sums therein specified opposite our respective names, being full compensation for our services rendered for the period covered
            </td>
        </tr>
    </table>
   <table style="width: 100%;">
    <tr>
       
        <td rowspan="2">Series</td>
        <td rowspan="2">Name</td>
        <td rowspan="2">Position</td>
        <td rowspan="2">SG</td>
        <td rowspan="2">Step</td>
        <td colspan="3"></td>
        <td colspan="13" style="text-align: center;">
            Deductions
        </td>
        
    </tr>
    <tr>
        <td>Basic Salary</td>
        <td>PERA</td>
        <td>Gross Amount</td>
        <td>Witdholding Tax</td>
        <td>GSIS Premium</td>
        <td>GSIS Conso Loan</td>
        <td>GSIS Emergency Loan</td>
        <td>GSIS Policy Loan</td>
        <td>GSIS Real Estate</td>
        <td>GSIS OULI</td>
        <td>GSIS GFALL II</td>
        <td>GSIS MPL</td>
        <td>GSIS CPL</td>
        <td>Phil Healtd</td>
        <td>HDMF Premium</td>
        <td>HDMF MPII</th>
    </tr>
    <tr>
        <td></td>
        <td>Project I GASS</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    @php
        $counter = 1;
    @endphp
    @foreach($plantilla_data['data'] as $item)
    <tr>
        <td>{{ $counter++ }}</td>
        <td>{{ $item->employee_name }}</td>
        <td>{{ $item->employee_position }}</td>
        <td>{{ $item->employee_sg }}</td>
        <td>{{ $item->employee_step }}</td>
        <td>{{ $item->basic_salary }}</td>
        <td>{{ $item->PERA }}</td>
        <td>{{ $item->gross_amount }}</td>
        <td>{{ $item->withholding_tax }}</td>
        <td>{{ $item->gsis_premium }}</td>
        <td>{{ $item->gsis_conso_loan }}</td>
        <td>{{ $item->gsis_emergency_loan }}</td>
        <td>{{ $item->gsis_policy_loan }}</td>
        <td>{{ $item->gsis_real_estate }}</td>
        <td>{{ $item->gsis_ouli }}</td>
        <td>{{ $item->gsis_gfall_ii }}</td>
        <td>{{ $item->gsis_mpl }}</td>
        <td>{{ $item->gsis_cpl }}</td>
        <td>{{ $item->phil_health }}</td>
        <td>{{ $item->hdmf_premium }}</td>
        <td>{{ $item->hdmf_mp_ii }}</td>
    </tr>
@endforeach


   </table>

   <table style="width: 100%;" class="new-page">
    <tr>
        <td rowspan="2">Series</td>
        <td rowspan="2">Name</td>
        <td colspan="14" align="center">Deductions</td>
        <td rowspan="2">Total Deductions</td>
        <td rowspan="2">Net Amount Due</td>
        <td rowspan="2">Remarks</td>
    </tr>
   
    <tr>
       
        <td>HDMF Housing Loan</td>
        <td>HDMF MPL/CL</td>
        <td>BSUCMPC Loans</td>
        <td>BSUCMPC Savings and Share Capital</td>
        <td>Landbank Loan</td>
        <td>China Bank Savings</td>
        <td>Coco Premium</td>
        <td>AIA Phil Life and GIC,INC. (Phil Am)</td>
        <td>PPSTA</td>
        <td>Water</td>
        <td>Electric</td>
        <td>COA-ND</td>
        <td>UCPBS</td>
        <td>BSU Housing Occupancy Fee</td>
    </tr>
    @php
        $second_counter = 1;
    @endphp
    @foreach($plantilla_data['data'] as $item)
    <tr>
        <td>{{ $second_counter++ }}</td>
        <td>{{ $item->employee_name }}</td>
        <td>{{ $item->hdmf_housing_loan }}</td>
        <td>{{ $item->hdmf_mpl_cl }}</td>
        <td>{{ $item->bsucmpc_loans }}</td>
        <td>{{ $item->bsucmpc_savings_and_share_capital }}</td>
        <td>{{ $item->landbank_loan }}</td>
        <td>{{ $item->china_bank_savings }}</td>
        <td>{{ $item->coco_premium }}</td>
        <td>{{ $item->phil_am }}</td>
        <td>{{ $item->ppsta }}</td>
        <td>{{ $item->water }}</td>
        <td>{{ $item->electric }}</td>
        <td>{{ $item->coa_nd }}</td>
        <td>{{ $item->ucpbs }}</td>
        <td>{{ $item->bsu_housing_occupancy_fee }}</td>
        <td>{{ $item->total_deductions }}</td>
        <td>{{ $item->net_amount_due }}</td>
        <td>{{ $item->remarks }}</td>
    </tr>
@endforeach


   </table>
</section>

</body>
</html>
