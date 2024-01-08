<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\LandbankBilling;
use Maatwebsite\Excel\Facades\Excel; 
use App\Exports\LandbankBillingExport;

class ExcelController extends Controller
{
    public function generateExcel(Request $request)
    {
        try {
            $export = new LandbankBillingExport();
            $filePath = storage_path('app/excel/landbank_billing.xlsx');
    
            Excel::store($export, 'excel/landbank_billing.xlsx');
    
            return response()->json(['success' => true, 'file_path' => $filePath]);
        } catch (\Exception $e) {
            // Log or handle the exception
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
    
}
