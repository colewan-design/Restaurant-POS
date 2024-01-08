<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;

use App\Models\LandbankBilling;
use App\Models\PhilamBilling;
use App\Models\GeneralPlantillaPayroll;
use App\Models\CurrentPay;



use Pdf;

class PDFController extends Controller
{
    public function generatePDF(Request $request)
    {
        $landbank_bill = LandbankBilling::get();

        $data = [
            'title' => 'Tetst',
            'amount' => $landbank_bill
        ];

        $pdf = PDF::loadView('pdf.test', $data);
        return $pdf->download('test.pdf');
    }

    public function generateDVPDFPhilamBilling(Request $request)
    {
        $philam_bill = PhilamBilling::get();
    
        $data = [
            'title' => 'Philam Disbursement Voucher',
            'data' => $philam_bill
        ];
    
        $pdf = PDF::loadView('pdf.philam_dv', $data);
    
        // Set paper size to long bond (8.5 x 13 inches)
        $pdf->setPaper(8.5 * 25.4, 13 * 25.4);
    
        return $pdf->download('philam_dv.pdf');
    }
//    public function generatePlantillaPayroll(Request $request)
//     {
//         $plantilla_payroll = DB::table('general_plantilla_payroll')->get();
//         $plantilla_data = [
//             'title' => 'General Plantilla Payroll',
//             'data' => $plantilla_payroll
//         ];

//         // Pass $plantilla_data to the view
//         return stream('pdf.plantilla_payroll', compact('plantilla_data'));
//     }

    public function generatePlantillaPayroll(Request $request)
    {
        $currentPay = CurrentPay::latest()->first();
        // dd($currentPay);
        // $plantilla_payroll = DB::table('general_plantilla_payroll')->get();
        $plantilla_payroll = DB::table('general_plantilla_payroll')
        ->where(function ($query) use ($currentPay) {
            $query->where('first_half_start', '>=', $currentPay->first_half_start)
                ->where('second_half_end', '<=', $currentPay->second_half_end);
        })
        ->get();

        $plantilla_data = [
            'title' => 'General Plantilla Payroll',
            'data' => $plantilla_payroll
        ];

        $pdf = PDF::loadView('pdf.plantilla_payroll', compact('plantilla_data'));

        // Save the PDF to the storage path
        $pdfPath = 'pdfs/plantilla_payroll.pdf';
        Storage::put($pdfPath, $pdf->output());

        // Return the PDF as a download response
        return response()->download(storage_path("app/$pdfPath"));
    }

    
}