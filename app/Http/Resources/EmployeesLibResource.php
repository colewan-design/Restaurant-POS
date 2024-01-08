<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeesLibResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'   => $this->id,
            'employee_id' => $this->employee_id,
            'employee_name' => $this->employee_name,
            'email_address' => $this->email_address,
            'salary_grade' => $this->salary_grade,
            'step' => $this->step,
            'position' => $this->position,
            'place_of_assignment' => $this->place_of_assignment,
            'status' => $this->status,
            'created_at' => $this->created_at->toDateString()
        ];
    }
}
